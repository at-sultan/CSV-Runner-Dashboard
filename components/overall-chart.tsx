'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { RunningRecord } from '@/types/running';
import { getDailyTotals } from '@/lib/stats-calculator';

interface OverallChartProps {
  records: RunningRecord[];
}

export function OverallChart({ records }: OverallChartProps) {
  const dailyData = getDailyTotals(records);

  const chartData = dailyData.map((item) => ({
    date: new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    miles: item.miles,
  }));

  const chartConfig = {
    miles: {
      label: 'Miles',
      color: 'hsl(var(--chart-1))',
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Running Activity</CardTitle>
        <CardDescription>Total miles run per day across all runners</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
     <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
           tickMargin={10}
              axisLine={false}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={10} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
          dataKey="miles"
              fill="var(--color-miles)"
              radius={[4, 4, 0, 0]}
            />
    </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
