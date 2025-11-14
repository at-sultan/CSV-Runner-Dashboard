import { RunningRecord, PersonStats, OverallStats } from '@/types/running';

export function calculateOverallStats(records: RunningRecord[]): OverallStats {
  if (records.length === 0) {
    return {
      totalMiles: 0,
      averageMiles: 0,
      minMiles: 0,
      maxMiles: 0,
      totalRuns: 0,
      uniqueRunners: 0,
    };
  }

  const miles = records.map((r) => r.miles);
  const totalMiles = miles.reduce((sum, m) => sum + m, 0);
  const uniqueRunners = new Set(records.map((r) => r.person)).size;

  return {
    totalMiles,
    averageMiles: totalMiles / records.length,
    minMiles: Math.min(...miles),
    maxMiles: Math.max(...miles),
    totalRuns: records.length,
    uniqueRunners,
  };
}

export function calculatePersonStats(records: RunningRecord[]): PersonStats[] {
  const personMap = new Map<string, number[]>();

  records.forEach((record) => {
    if (!personMap.has(record.person)) {
      personMap.set(record.person, []);
    }
    personMap.get(record.person)!.push(record.miles);
  });

  const stats: PersonStats[] = [];

  personMap.forEach((miles, person) => {
    const totalMiles = miles.reduce((sum, m) => sum + m, 0);
    stats.push({
      person,
      totalMiles,
      averageMiles: totalMiles / miles.length,
      minMiles: Math.min(...miles),
      maxMiles: Math.max(...miles),
      runCount: miles.length,
    });
  });

  return stats.sort((a, b) => b.totalMiles - a.totalMiles);
}

export function getDailyTotals(records: RunningRecord[]): Array<{ date: string; miles: number }> {
  const dailyMap = new Map<string, number>();

  records.forEach((record) => {
    const existing = dailyMap.get(record.date) || 0;
    dailyMap.set(record.date, existing + record.miles);
  });

  return Array.from(dailyMap.entries())
    .map(([date, miles]) => ({ date, miles }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getPersonDailyData(
  records: RunningRecord[],
  person: string
): Array<{ date: string; miles: number }> {
  return records
    .filter((r) => r.person === person)
    .map((r) => ({ date: r.date, miles: r.miles }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
