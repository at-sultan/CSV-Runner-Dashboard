'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { X } from 'lucide-react';
import { RunningRecord } from '@/types/running';
import { getPersonDailyData } from '@/lib/stats-calculator';

interface PersonDetailChartProps {
  records: RunningRecord[];
  person: string;
  onClose: () => void;
}

export function PersonDetailChart({ records, person, onClose }: PersonDetailChartProps) {
  const personData = getPersonDailyData(records, person);

  const chartData = personData.map((item) => ({
    date: new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    miles: item.miles,
  }));

  const chartConfig = {
    miles: {
      label: 'Miles',
      color: 'hsl(var(--chart-2))',
    },
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{person}&apos;s Running Activity</CardTitle>
            <CardDescription>Miles run per day</CardDescription>
     </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={10} />
            <ChartTooltip content={<ChartTooltipContent />} />
         <Line
              type="monotone"
              dataKey="miles"
           stroke="var(--color-miles)"
              strokeWidth={2}
              dot={{ fill: 'var(--color-miles)', r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
