'use client';

import { useState, useRef } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { parseCSV } from '@/lib/csv-parser';
import { RunningRecord } from '@/types/running';

interface CSVUploadProps {
  onDataLoaded: (data: RunningRecord[]) => void;
}

export function CSVUpload({ onDataLoaded }: CSVUploadProps) {
  const [errors, setErrors] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.name.endsWith('.csv')) {
      setErrors(['Please upload a CSV file']);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const result = parseCSV(content);

      if (!result.success) {
        setErrors(result.errors || ['Unknown error occurred']);
        setWarnings([]);
      } else {
        setErrors([]);
        setWarnings(result.errors || []);
        onDataLoaded(result.data || []);
      }
    };

    reader.onerror = () => {
      setErrors(['Failed to read file']);
    };

    reader.readAsText(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Running Data</CardTitle>
        <CardDescription>
          Upload a CSV file with columns: date, person, miles
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Drag and drop your CSV file here, or
            </p>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              Browse Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>
        </div>

        {errors.length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="font-semibold mb-2">Errors found:</div>
              <ul className="list-disc list-inside space-y-1">
                {errors.map((error, i) => (
                  <li key={i} className="text-sm">
                    {error}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {warnings.length > 0 && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="font-semibold mb-2">
                Data loaded with warnings:
              </div>
              <ul className="list-disc list-inside space-y-1">
                {warnings.map((warning, i) => (
                  <li key={i} className="text-sm">
                    {warning}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <div className="text-xs text-muted-foreground space-y-1 pt-4 border-t">
          <p className="font-semibold">Expected CSV format:</p>
          <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
date,person,miles{'\n'}
2024-01-01,John Doe,5.2{'\n'}
2024-01-02,Jane Smith,3.8
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
