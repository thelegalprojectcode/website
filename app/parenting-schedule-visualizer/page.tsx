"use client"
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Calendar, Users, Info, FileText, Gift, FileDown, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import ScheduleCalendar from '../components/schedule/ScheduleCalendar';
import ScheduleStats from '../components/schedule/ScheduleStats';
import { supabase } from '../../lib/supabase';

const ParentingScheduleVisualizer = () => {
  const [startDate, setStartDate] = useState('');
  const [scheduleType, setScheduleType] = useState('alternating-weeks');
  const [childrenNames, setchildrenNames] = useState('');
  const [parentAName, setParentAName] = useState('Parent 1');
  const [parentBName, setParentBName] = useState('Parent 2');
  const [parentAColor, setParentAColor] = useState('#7ea591');
  const [parentBColor, setParentBColor] = useState('#c181a3');
  const [schedule, setSchedule] = useState<any>(null);
  const [baseSchedule, setBaseSchedule] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // PDF Download Dialog State
  const [showPdfDialog, setShowPdfDialog] = useState(false);
  const [showPdfSuccess, setShowPdfSuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [pdfFormData, setPdfFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    zipCode: '',
    wantConsultation: false,
    effectiveDate: '',
    jurisdiction: '',
    caseNumber: ''
  });

  const currentYear = new Date().getFullYear();
  const [holidays, setHolidays] = useState<any[]>(() => [
    { id: 'thanksgiving', name: 'Thanksgiving', date: `${currentYear}-11-28`, enabled: false, parent: 'Parent 1' },
    { id: 'christmas-eve', name: 'Christmas Eve', date: `${currentYear}-12-24`, enabled: false, parent: 'Parent 1' },
    { id: 'christmas', name: 'Christmas Day', date: `${currentYear}-12-25`, enabled: false, parent: 'Parent 1' },
    { id: 'new-years', name: "New Year's Day", date: `${currentYear + 1}-01-01`, enabled: false, parent: 'Parent 1' },
    { id: 'mothers-day', name: "Mother's Day", date: `${currentYear}-05-11`, enabled: false, parent: 'Parent 1' },
    { id: 'fathers-day', name: "Father's Day", date: `${currentYear}-06-15`, enabled: false, parent: 'Parent 1' },
    { id: 'spring-break', name: 'Spring Break (week)', date: `${currentYear}-03-24`, enabled: false, parent: 'Parent 1' },
    { id: 'summer-break', name: 'Summer Break (2 weeks)', date: `${currentYear}-07-01`, enabled: false, parent: 'Parent 1' },
  ]);

  const toggleHoliday = useCallback((id: string) => {
    setHolidays((prev: any[]) =>
      prev.map((h: any) =>
        h.id === id ? { ...h, enabled: !h.enabled } : h
      )
    );
  }, []);

  // Memoized input handlers to prevent re-creating on every render
  const handleStartDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  }, []);

  const handlechildrenNamesChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setchildrenNames(e.target.value);
  }, []);

  const handleParentANameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setParentAName(e.target.value);
  }, []);

  const handleParentBNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setParentBName(e.target.value);
  }, []);

  const handleParentAColorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setParentAColor(e.target.value);
  }, []);

  const handleParentBColorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setParentBColor(e.target.value);
  }, []);

  // Regenerate schedule when holidays change
  useEffect(() => {
    if (baseSchedule) {
      const scheduleWithHolidays = baseSchedule.map((day: any) => ({ ...day }));

      // Apply only enabled holiday overrides
      const enabledHolidays = holidays.filter((h: any) => h.enabled);
      enabledHolidays.forEach((holiday: any) => {
        const holidayIndex = scheduleWithHolidays.findIndex((day: any) => day.date === holiday.date);
        if (holidayIndex !== -1) {
          scheduleWithHolidays[holidayIndex] = {
            ...scheduleWithHolidays[holidayIndex],
            parent: holiday.parent,
            holiday: true,
            holidayName: holiday.name,
          };
        }
      });

      setSchedule(scheduleWithHolidays);
    }
  }, [holidays, baseSchedule]);

  const generateSchedule = (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate) {
      alert('Please select a start date');
      return;
    }

    setIsGenerating(true);
    setShowSuccess(false);

    // Simulate a brief loading state for better UX
    setTimeout(() => {
      const start = new Date(startDate);
      const scheduleData: any[] = [];
      const daysToGenerate = 365;

    const addDays = (date: Date, days: number) => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };

    const formatDate = (date: Date) => {
      return date.toISOString().split('T')[0];
    };

    const getDayOfWeek = (date: Date) => {
      return date.getDay();
    };

    switch (scheduleType) {
      case 'alternating-weeks': {
        let currentParent = parentAName;
        for (let i = 0; i < daysToGenerate; i++) {
          const currentDate = addDays(start, i);
          const dayOfWeek = getDayOfWeek(currentDate);

          if (dayOfWeek === 0 && i > 0) {
            currentParent = currentParent === parentAName ? parentBName : parentAName;
          }

          scheduleData.push({
            date: formatDate(currentDate),
            parent: currentParent,
            transition: dayOfWeek === 0 && i > 0
          });
        }
        break;
      }
      case '2-2-3': {
        let weekendParent = parentAName;
        for (let i = 0; i < daysToGenerate; i++) {
          const currentDate = addDays(start, i);
          const dayOfWeek = getDayOfWeek(currentDate);
          let currentParent;

          if (dayOfWeek === 1) { // Monday
            currentParent = parentAName;
          } else if (dayOfWeek === 2) { // Tuesday
            currentParent = parentAName;
          } else if (dayOfWeek === 3) { // Wednesday
            currentParent = parentBName;
          } else if (dayOfWeek === 4) { // Thursday
            currentParent = parentBName;
          } else { // Friday, Saturday, Sunday
            currentParent = weekendParent;
            if (dayOfWeek === 0) { // Sunday - switch for next weekend
              weekendParent = weekendParent === parentAName ? parentBName : parentAName;
            }
          }

          // Check if parent changed from previous day
          const previousParent = i > 0 ? scheduleData[i - 1].parent : null;
          const isTransition = previousParent !== null && currentParent !== previousParent;

          scheduleData.push({
            date: formatDate(currentDate),
            parent: currentParent,
            transition: isTransition
          });
        }
        break;
      }
      case '2-2-5-5': {
        let weekendParent = parentAName;
        for (let i = 0; i < daysToGenerate; i++) {
          const currentDate = addDays(start, i);
          const dayOfWeek = getDayOfWeek(currentDate);
          let currentParent;

          if (dayOfWeek === 1) { // Monday
            currentParent = parentAName;
          } else if (dayOfWeek === 2) { // Tuesday
            currentParent = parentAName;
          } else if (dayOfWeek === 3) { // Wednesday
            currentParent = parentBName;
          } else if (dayOfWeek === 4) { // Thursday
            currentParent = parentBName;
          } else { // Friday, Saturday, Sunday
            currentParent = weekendParent;
            if (dayOfWeek === 0) { // Sunday - switch for next weekend
              weekendParent = weekendParent === parentAName ? parentBName : parentAName;
            }
          }

          // Check if parent changed from previous day
          const previousParent = i > 0 ? scheduleData[i - 1].parent : null;
          const isTransition = previousParent !== null && currentParent !== previousParent;

          scheduleData.push({
            date: formatDate(currentDate),
            parent: currentParent,
            transition: isTransition
          });
        }
        break;
      }
      case 'every-other-weekend': {
        let weekendParent = parentAName;
        for (let i = 0; i < daysToGenerate; i++) {
          const currentDate = addDays(start, i);
          const dayOfWeek = getDayOfWeek(currentDate);
          let currentParent;
          let isTransition = false;

          if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {
            currentParent = weekendParent;
            if (dayOfWeek === 5) isTransition = true;
            if (dayOfWeek === 0) weekendParent = weekendParent === parentAName ? parentBName : parentAName;
          } else {
            currentParent = parentAName;
            if (dayOfWeek === 1) isTransition = true;
          }

          scheduleData.push({
            date: formatDate(currentDate),
            parent: currentParent,
            transition: isTransition
          });
        }
        break;
      }
      case '3-4-4-3': {
        const pattern = [
          parentAName, parentAName, parentAName,
          parentBName, parentBName, parentBName, parentBName,
          parentBName, parentBName, parentBName, parentBName,
          parentAName, parentAName, parentAName
        ];

        for (let i = 0; i < daysToGenerate; i++) {
          const currentDate = addDays(start, i);
          const patternIndex = i % pattern.length;
          const currentParent = pattern[patternIndex];
          const previousParent = patternIndex > 0 ? pattern[patternIndex - 1] : pattern[pattern.length - 1];

          scheduleData.push({
            date: formatDate(currentDate),
            parent: currentParent,
            transition: currentParent !== previousParent
          });
        }
        break;
      }
    }

    const enabledHolidays = holidays.filter((h: any) => h.enabled);
    enabledHolidays.forEach((holiday: any) => {
      const holidayIndex = scheduleData.findIndex(day => day.date === holiday.date);
      if (holidayIndex !== -1) {
        scheduleData[holidayIndex] = {
          ...scheduleData[holidayIndex],
          parent: holiday.parent,
          holiday: true,
          holidayName: holiday.name,
          transition: false
        };
      }
    });

    setBaseSchedule([...scheduleData]);
    setSchedule(scheduleData);
    setIsGenerating(false);
    setShowSuccess(true);

    console.log('Schedule generated successfully:', scheduleData);
    console.log('Schedule holidays:', holidays);

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  const exportToICS = () => {
    if (!schedule) return;

    const icsEvents = schedule.map((day: any) => {
      const date = day.date.replace(/-/g, '');
      const title = day.holiday ? `${day.holidayName} - ${day.parent}` : day.parent;

      return [
        'BEGIN:VEVENT',
        `DTSTART;VALUE=DATE:${date}`,
        `DTEND;VALUE=DATE:${date}`,
        `SUMMARY:${title}`,
        `DESCRIPTION:Custody with ${day.parent}`,
        'END:VEVENT'
      ].join('\n');
    }).join('\n');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Parenting Schedule Visualizer//EN',
      'CALSCALE:GREGORIAN',
      icsEvents,
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `parenting-schedule-${startDate}.ics`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handlePdfDownloadClick = () => {
    if (!schedule) return;
    setShowPdfDialog(true);
  };

  const handlePdfFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pdfFormData.fullName || !pdfFormData.email || !pdfFormData.zipCode) {
      alert('Please fill in all required fields');
      return;
    }

    setIsDownloading(true);

    const requestData = {
        fullName: pdfFormData.fullName,
        email: pdfFormData.email,
        phone: pdfFormData.phone,
        zipCode: pdfFormData.zipCode,
        wantConsultation: pdfFormData.wantConsultation,
        schedule: schedule,
        startDate: startDate,
        scheduleType: scheduleType,
        parentAName: parentAName,
        parentBName: parentBName,
        parentAColor: parentAColor,
        parentBColor: parentBColor,
        holidays: holidays.filter((h: any) => h.enabled),
        effectiveDate: pdfFormData.effectiveDate,
        jurisdiction: pdfFormData.jurisdiction,
        caseNumber: pdfFormData.caseNumber,
        childrenNames: childrenNames,
        currentYear: new Date(startDate).getFullYear()
      };

      // Insert data into Supabase directly
      try {
        // Prepare data for insertion
        const supabaseData = {
          full_name: pdfFormData.fullName,
          case_number: pdfFormData.caseNumber,
          children_names: childrenNames,
          phone: pdfFormData.phone,
          email: pdfFormData.email,
          holidays: holidays.filter((h: any) => h.enabled),
          schedule_type: scheduleType,
          start_date: startDate,
          effective_date: pdfFormData.effectiveDate,
          want_consultation: pdfFormData.wantConsultation,
          zip_code: pdfFormData.zipCode,
          parent_a_name: parentAName,
          parent_a_color: parentAColor,
          parent_b_name: parentBName,
          parent_b_color: parentBColor,
          jurisdiction: pdfFormData.jurisdiction,
        };

        // Insert into parenting_schedules table
        const { data, error } = await supabase
          .from('parenting_schedules')
          .insert([supabaseData])
          .select();

        if (error) {
          console.error('Supabase insert error:', error);
        } else {
          console.log('Successfully inserted into Supabase:', data);
        }
      } catch (supabaseError) {
        console.error('Error inserting into Supabase:', supabaseError);
        // Don't block the PDF download if Supabase fails
      }
      // console.log('Request Data for PDF:', requestData); 

    try {
      const pdfResponse = await fetch(
        'https://api.ovlg.com/v3/api/start/public/index.php/api/forum-lex-pdf-download',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!pdfResponse.ok) {
        throw new Error('Failed to generate PDF');
      }

      // const blob = await pdfResponse.blob();
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `parenting-schedule-${startDate}.pdf`;
      // a.click();
      // window.URL.revokeObjectURL(url);

      setShowPdfDialog(false);
      setShowPdfSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowPdfSuccess(false), 5000);
      
      setPdfFormData({
        fullName: '',
        email: '',
        phone: '',
        zipCode: '',
        wantConsultation: false,
        effectiveDate: '',
        jurisdiction: '',
        caseNumber: ''
      });

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to submit. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

   return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* <Header /> */}
      
      {/* Banner Section */}
      <section className="bg-slate-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-6">
            <Calendar className="w-8 h-8 text-white" />
          </div> */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Parenting Schedule Visualizer</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Create a clear, color-coded custody calendar that works for your family. 
            Visualize different custody arrangements and plan for holidays with ease.
          </p>
        </div>
      </section>
      
      <main className="mx-auto px-4 py-8 max-w-7xl">
        {/* PDF Success Message */}
        {showPdfSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm animate-in fade-in">
            <Card className="bg-green-50 border-green-200 shadow-2xl max-w-md mx-4 animate-in zoom-in-95">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900 text-lg mb-2">Success!</h3>
                    <p className="text-sm text-green-800">
                      Your parenting schedule has been submitted successfully. We'll send the PDF to your email shortly.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-[400px_1fr] gap-6 mb-8">
          {/* Sidebar Form */}
          <Card className="h-fit shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Schedule Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={generateSchedule} name="google-sheet" className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Basic Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={handleStartDateChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scheduleType">Schedule Type</Label>
                    <Select value={scheduleType} onValueChange={setScheduleType}>
                      <SelectTrigger id="scheduleType">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alternating-weeks">Alternating Weeks</SelectItem>
                        <SelectItem value="2-2-3">2-2-3 Schedule</SelectItem>
                        <SelectItem value="2-2-5-5">2-2-5-5 Schedule</SelectItem>
                        <SelectItem value="every-other-weekend">Every Other Weekend</SelectItem>
                        <SelectItem value="3-4-4-3">3-4-4-3 Schedule</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      {scheduleType === 'alternating-weeks' && 'Children alternate between parents each week'}
                      {scheduleType === '2-2-3' && 'Mon-Tue with one parent, Wed-Thu with other, Fri-Sun alternates'}
                      {scheduleType === '2-2-5-5' && 'Mon-Tue with one parent, Wed-Thu with other, 5-day weekends alternate'}
                      {scheduleType === 'every-other-weekend' && 'Primary parent during week, alternating weekends'}
                      {scheduleType === '3-4-4-3' && 'First parent 3 days, second 4 days, alternates weekly'}
                    </p>
                  </div>
                </div>

                {/* Child Name */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold text-lg">Child Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="childrenNames">Child's Name</Label>
                    <Input
                      id="childrenNames"
                      value={childrenNames}
                      onChange={handlechildrenNamesChange}
                      placeholder="Enter child's name"
                    />
                  </div>
                </div>

                {/* Parent A Settings */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold text-lg">Parent A</h3>
                  
                  <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
                    <div className="space-y-2">
                      <Label htmlFor="parentAName">Name</Label>
                      <Input
                        id="parentAName"
                        value={parentAName}
                        onChange={handleParentANameChange}
                        placeholder="Parent 1"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="parentAColor">Color</Label>
                      <Input
                        id="parentAColor"
                        type="color"
                        value={parentAColor}
                        onChange={handleParentAColorChange}
                        className="w-10 h-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Parent B Settings */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold text-lg">Parent B</h3>
                  
                  <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
                    <div className="space-y-2">
                      <Label htmlFor="parentBName">Name</Label>
                      <Input
                        id="parentBName"
                        value={parentBName}
                        onChange={handleParentBNameChange}
                        placeholder="Parent 2"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="parentBColor">Color</Label>
                      <Input
                        id="parentBColor"
                        type="color"
                        value={parentBColor}
                        onChange={handleParentBColorChange}
                        className="w-10 h-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Holiday Overrides Section */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Gift className="w-5 h-5" />
                    Holiday Overrides
                  </h3>
                  
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {holidays.map((holiday: any) => (
                      <div 
                        key={holiday.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Checkbox
                          id={`holiday-${holiday.id}`}
                          checked={holiday.enabled}
                          onCheckedChange={() => toggleHoliday(holiday.id)}
                          className="h-4 w-4"
                        />
                        <label
                          htmlFor={`holiday-${holiday.id}`}
                          className="flex-1 text-sm font-medium cursor-pointer select-none"
                        >
                          {holiday.name}
                        </label>
                        <Select 
                          value={holiday.parent} 
                          onValueChange={(value) => {
                            setHolidays((prev: any[]) => 
                              prev.map((h: any) => 
                                h.id === holiday.id ? { ...h, parent: value } : h
                              )
                            );
                          }}
                          disabled={!holiday.enabled}
                        >
                          <SelectTrigger className="w-32 h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={parentAName}>{parentAName}</SelectItem>
                            <SelectItem value={parentBName}>{parentBName}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Generate Schedule
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Main Display Area */}
          <div className="space-y-6">
            {/* Info Card */}
            {!schedule && (
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Getting Started</h3>
                      <p className="text-sm text-blue-800">
                        Fill in the form on the left to generate your customized parenting schedule. 
                        You can visualize different custody arrangements, add holiday overrides, 
                        and export the calendar for your records.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Statistics */}
            {schedule && (
              <ScheduleStats 
                schedule={schedule}
                parentAName={parentAName}
                parentBName={parentBName}
                parentAColor={parentAColor}
                parentBColor={parentBColor}
              />
            )}

            {/* Calendar */}
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Schedule Calendar
                  </CardTitle>
                  {schedule && (
                    <div className="flex gap-2 flex-wrap">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handlePdfDownloadClick}
                        className="flex items-center gap-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 border-none"
                      >
                        <FileDown className="w-4 h-4" />
                        PDF
                      </Button>
                      {/* <Button 
                        variant="outline" 
                        size="sm"
                        onClick={exportToCSV}
                        className="flex items-center gap-1"
                      >
                        <Download className="w-4 h-4" />
                        CSV
                      </Button> */}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={exportToICS}
                        className="flex items-center gap-1"
                      >
                        <FileText className="w-4 h-4" />
                        iCalendar
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ScheduleCalendar
                  schedule={schedule}
                  parentAColor={parentAColor}
                  parentBColor={parentBColor}
                  parentAName={parentAName}
                  parentBName={parentBName}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* PDF Download Dialog */}
      <Dialog open={showPdfDialog} onOpenChange={setShowPdfDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileDown className="w-5 h-5 text-purple-600" />
              Get Schedule as PDF via email
            </DialogTitle>
            <DialogDescription>
              Please provide your information to download your personalized parenting schedule.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handlePdfFormSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="pdfFullName">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="pdfFullName"
                placeholder="John Doe"
                value={pdfFormData.fullName}
                onChange={(e) => setPdfFormData({ ...pdfFormData, fullName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pdfEmail">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="pdfEmail"
                type="email"
                placeholder="john.doe@example.com"
                value={pdfFormData.email}
                onChange={(e) => setPdfFormData({ ...pdfFormData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pdfPhone">Phone (Optional)</Label>
              <Input
                id="pdfPhone"
                type="tel"
                placeholder="(555) 123-4567"
                value={pdfFormData.phone}
                onChange={(e) => setPdfFormData({ ...pdfFormData, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pdfEffectiveDate">
                Effective Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="pdfEffectiveDate"
                type="date"
                value={pdfFormData.effectiveDate}
                onChange={(e) => setPdfFormData({ ...pdfFormData, effectiveDate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pdfJurisdiction">
                Jurisdiction <span className="text-red-500">*</span>
              </Label>
              <Input
                id="pdfJurisdiction"
                placeholder="County, State"
                value={pdfFormData.jurisdiction}
                onChange={(e) => setPdfFormData({ ...pdfFormData, jurisdiction: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pdfCaseNumber">
                Case Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="pdfCaseNumber"
                placeholder="e.g., 2024-CV-12345"
                value={pdfFormData.caseNumber}
                onChange={(e) => setPdfFormData({ ...pdfFormData, caseNumber: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pdfZipCode">
                Zip Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="pdfZipCode"
                placeholder="12345"
                value={pdfFormData.zipCode}
                onChange={(e) => setPdfFormData({ ...pdfFormData, zipCode: e.target.value })}
                required
                maxLength={10}
              />
              <p className="text-xs text-gray-500">For lawyer matching in your area</p>
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="pdfConsultation"
                checked={pdfFormData.wantConsultation}
                onCheckedChange={(checked) => 
                  setPdfFormData({ ...pdfFormData, wantConsultation: checked as boolean })
                }
              />
              <label
                htmlFor="pdfConsultation"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                I'd like a free consultation about my custody case
              </label>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPdfDialog(false)}
                disabled={isDownloading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isDownloading}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isDownloading ? (
                  <>
                    <span className="mr-2">Generating PDF...</span>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </>
                ) : (
                  <>
                    <FileDown className="w-4 h-4 mr-2" />
                    Email PDF
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* <Footer /> */}
    </div>
  );
};

export default ParentingScheduleVisualizer;
