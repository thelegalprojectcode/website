"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface ScheduleStatsProps {
  schedule: any;
  parentAName: string;
  parentBName: string;
  parentAColor: string;
  parentBColor: string;
}

const ScheduleStats = ({
  schedule,
  parentAName,
  parentBName,
  parentAColor,
  parentBColor
}: ScheduleStatsProps) => {
  // Calculate statistics
  const totalDays = schedule.length;
  const parentADays = schedule.filter((d: any) => d.parent === parentAName).length;
  const parentBDays = schedule.filter((d: any) => d.parent === parentBName).length;
  const parentAPercent = ((parentADays / totalDays) * 100).toFixed(1);
  const parentBPercent = ((parentBDays / totalDays) * 100).toFixed(1);

  const transitions = schedule.filter((d: any, i: number) =>
    i > 0 && d.parent !== schedule[i - 1].parent
  ).length;

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="border border-slate-200">
        <CardHeader className="pb-2 px-4 pt-4">
          <CardTitle className="text-xs font-medium text-slate-600 flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: parentAColor }}
            />
            <span className="truncate">{parentAName}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="text-2xl font-bold text-slate-900">{parentADays}</div>
          <p className="text-xs text-slate-500 mt-0.5">
            {parentAPercent}% of schedule
          </p>
        </CardContent>
      </Card>

      <Card className="border border-slate-200">
        <CardHeader className="pb-2 px-4 pt-4">
          <CardTitle className="text-xs font-medium text-slate-600 flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: parentBColor }}
            />
            <span className="truncate">{parentBName}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="text-2xl font-bold text-slate-900">{parentBDays}</div>
          <p className="text-xs text-slate-500 mt-0.5">
            {parentBPercent}% of schedule
          </p>
        </CardContent>
      </Card>

      <Card className="border border-slate-200">
        <CardHeader className="pb-2 px-4 pt-4">
          <CardTitle className="text-xs font-medium text-slate-600 flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span className="truncate">Transitions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="text-2xl font-bold text-slate-900">{transitions}</div>
          <p className="text-xs text-slate-500 mt-0.5">
            Custody changes
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleStats;