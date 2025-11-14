import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PersonStats } from '@/types/running';

interface PersonStatsTableProps {
  stats: PersonStats[];
  onSelectPerson: (person: string) => void;
}

export function PersonStatsTable({ stats, onSelectPerson }: PersonStatsTableProps) {
  return (
    <Card>
    <CardHeader>
        <CardTitle>Runner Statistics</CardTitle>
        <CardDescription>
          Performance metrics for each runner (click to view details)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
           <TableRow>
              <TableHead>Runner</TableHead>
              <TableHead className="text-right">Total Miles</TableHead>
              <TableHead className="text-right">Average</TableHead>
              <TableHead className="text-right">Min</TableHead>
              <TableHead className="text-right">Max</TableHead>
              <TableHead className="text-right">Runs</TableHead>
        </TableRow>
          </TableHeader>
       <TableBody>
            {stats.map((stat) => (
              <TableRow
                key={stat.person}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onSelectPerson(stat.person)}
              >
             <TableCell className="font-medium">{stat.person}</TableCell>
                <TableCell className="text-right">
                  {stat.totalMiles.toFixed(1)}
               </TableCell>
                <TableCell className="text-right">
                  {stat.averageMiles.toFixed(2)}
            </TableCell>
             <TableCell className="text-right">
                  {stat.minMiles.toFixed(1)}
                </TableCell>
             <TableCell className="text-right">
                  {stat.maxMiles.toFixed(1)}
        </TableCell>
                <TableCell className="text-right">{stat.runCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
