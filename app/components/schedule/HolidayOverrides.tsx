import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Gift } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Holiday {
  id: string;
  name: string;
  defaultDate: string;
  enabled: boolean;
  parent: string;
}

interface HolidayOverridesProps {
  holidays: any[];
  setHolidays: (holidays: any[]) => void;
  parentAName: string;
  parentBName: string;
}

const HolidayOverrides = ({
  holidays,
  setHolidays,
  parentAName,
  parentBName
}: HolidayOverridesProps) => {
  const currentYear = new Date().getFullYear();

  const predefinedHolidays: Holiday[] = [
    { id: 'thanksgiving', name: 'Thanksgiving', defaultDate: `${currentYear}-11-28`, enabled: false, parent: parentAName },
    { id: 'christmas-eve', name: 'Christmas Eve', defaultDate: `${currentYear}-12-24`, enabled: false, parent: parentAName },
    { id: 'christmas', name: 'Christmas Day', defaultDate: `${currentYear}-12-25`, enabled: false, parent: parentAName },
    { id: 'new-years', name: "New Year's Day", defaultDate: `${currentYear + 1}-01-01`, enabled: false, parent: parentAName },
    { id: 'mothers-day', name: "Mother's Day", defaultDate: `${currentYear}-05-11`, enabled: false, parent: parentAName },
    { id: 'fathers-day', name: "Father's Day", defaultDate: `${currentYear}-06-15`, enabled: false, parent: parentAName },
    { id: 'spring-break', name: 'Spring Break (week)', defaultDate: `${currentYear}-03-24`, enabled: false, parent: parentAName },
    { id: 'summer-break', name: 'Summer Break (2 weeks)', defaultDate: `${currentYear}-07-01`, enabled: false, parent: parentAName },
  ];

  const [holidayStates, setHolidayStates] = useState<Holiday[]>(predefinedHolidays);

  // Update holidays prop when states change
  useEffect(() => {
    const enabledHolidays = holidayStates
      .filter(h => h.enabled)
      .map(h => ({
        id: h.id,
        name: h.name,
        date: h.defaultDate,
        parent: h.parent
      }));
    setHolidays(enabledHolidays);
  }, [holidayStates, setHolidays]);

  const toggleHoliday = (id: string, checked: boolean) => {
    setHolidayStates(prev =>
      prev.map(h => h.id === id ? { ...h, enabled: checked } : h)
    );
  };

  const updateParent = (id: string, parent: string) => {
    setHolidayStates(prev =>
      prev.map(h => h.id === id ? { ...h, parent } : h)
    );
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="w-5 h-5" />
          Holiday Overrides
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {holidayStates.map((holiday) => (
          <div
            key={holiday.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Checkbox
              id={holiday.id}
              checked={holiday.enabled}
              onCheckedChange={(checked) => toggleHoliday(holiday.id, checked as boolean)}
              className="h-5 w-5"
            />
            <label
              htmlFor={holiday.id}
              className="flex-1 text-base font-medium cursor-pointer select-none"
            >
              {holiday.name}
            </label>
            <Select
              value={holiday.parent}
              onValueChange={(value) => updateParent(holiday.id, value)}
              disabled={!holiday.enabled}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={parentAName}>{parentAName}</SelectItem>
                <SelectItem value={parentBName}>{parentBName}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default HolidayOverrides;