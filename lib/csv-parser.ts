import { RunningRecord } from '@/types/running';

export interface ParseResult {
  success: boolean;
  data?: RunningRecord[];
  errors?: string[];
}

export function parseCSV(csvContent: string): ParseResult {
  const errors: string[] = [];
  const lines = csvContent.trim().split('\n');

  if (lines.length === 0) {
    return { success: false, errors: ['CSV file is empty'] };
  }

  const headerLine = lines[0].trim();
  const headers = headerLine.split(',').map((h) => h.trim().toLowerCase());

  const requiredHeaders = ['date', 'person', 'miles'];
  const missingHeaders = requiredHeaders.filter((h) => !headers.includes(h));

  if (missingHeaders.length > 0) {
    return {
      success: false,
      errors: [
        `Missing required columns: ${missingHeaders.join(', ')}. Expected: date, person, miles`,
      ],
    };
  }

  const dateIndex = headers.indexOf('date');
  const personIndex = headers.indexOf('person');
  const milesIndex = headers.indexOf('miles');

  const records: RunningRecord[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(',').map((v) => v.trim());

    if (values.length < 3) {
      errors.push(`Line ${i + 1}: Insufficient columns`);
      continue;
    }

    const date = values[dateIndex];
    const person = values[personIndex];
    const milesStr = values[milesIndex];

    if (!date) {
      errors.push(`Line ${i + 1}: Missing date`);
      continue;
    }

    if (!person) {
      errors.push(`Line ${i + 1}: Missing person name`);
      continue;
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      errors.push(`Line ${i + 1}: Invalid date format "${date}"`);
      continue;
    }

    const miles = parseFloat(milesStr);
    if (isNaN(miles) || miles < 0) {
      errors.push(`Line ${i + 1}: Invalid miles value "${milesStr}"`);
      continue;
    }

    records.push({
      date,
      person,
      miles,
    });
  }

  if (records.length === 0 && errors.length === 0) {
    return { success: false, errors: ['No valid data rows found in CSV'] };
  }

  if (errors.length > 0 && records.length === 0) {
    return { success: false, errors };
  }

  return { success: true, data: records, errors: errors.length > 0 ? errors : undefined };
}
