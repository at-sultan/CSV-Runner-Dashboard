import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Activity, Target } from 'lucide-react';
import { OverallStats } from '@/types/running';

interface StatsCardsProps {
  stats: OverallStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Total Miles</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalMiles.toFixed(1)}</div>
          <p className="text-xs text-muted-foreground">
     Across {stats.totalRuns} runs
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Miles</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
   <CardContent>
          <div className="text-2xl font-bold">
            {stats.averageMiles.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">Per run</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Min / Max</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.minMiles.toFixed(1)} / {stats.maxMiles.toFixed(1)}
       </div>
          <p className="text-xs text-muted-foreground">Miles range</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Runners</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.uniqueRunners}</div>
          <p className="text-xs text-muted-foreground">Unique people</p>
        </CardContent>
      </Card>
    </div>
  );
}
