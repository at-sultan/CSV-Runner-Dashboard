'use client';

import { useState } from 'react';
import { RunningRecord } from '@/types/running';
import { CSVUpload } from '@/components/csv-upload';
import { StatsCards } from '@/components/stats-cards';
import { OverallChart } from '@/components/overall-chart';
import { PersonStatsTable } from '@/components/person-stats-table';
import { PersonDetailChart } from '@/components/person-detail-chart';
import { calculateOverallStats, calculatePersonStats } from '@/lib/stats-calculator';
import { Activity } from 'lucide-react';



export default function Home() {
  const [data, setData] = useState<RunningRecord[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  const handleDataLoaded = (records: RunningRecord[]) => {
    setData(records);
    setSelectedPerson(null);
  };


const overallStats = data.length > 0 ? calculateOverallStats(data) : null;
  const personStats = data.length > 0 ? calculatePersonStats(data) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
       <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
        <Activity className="h-8 w-8 text-blue-600" />
         <h1 className="text-4xl font-bold tracking-tight">
              CSV Runner Dashboard
        </h1>
          </div>
       <p className="text-muted-foreground text-lg">
            Upload and analyze your running data with detailed visualizations and metrics
      </p>
        </header>

        <div className="space-y-6">
       <CSVUpload onDataLoaded={handleDataLoaded} />

       {data.length > 0 && overallStats && (
        <>
      <StatsCards stats={overallStats} />

        <OverallChart records={data} />

         {selectedPerson && (
        <PersonDetailChart
                  records={data}
                  person={selectedPerson}
                  onClose={() => setSelectedPerson(null)}
          />
              )}

          <PersonStatsTable
                stats={personStats}
                onSelectPerson={setSelectedPerson}
              />
            </>
          )}

       {data.length === 0 && (
        <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Activity className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No Data Yet</h3>
         <p className="text-muted-foreground">
                Upload a CSV file to start analyzing your running data
          </p>
         </div>
          )}
        </div>
      </div>
    </div>
  );
}
