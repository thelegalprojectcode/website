"use client"
import { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';

interface ScheduleCalendarProps {
  schedule: any;
  parentAColor: string;
  parentBColor: string;
  parentAName: string;
  parentBName: string;
}

const ScheduleCalendar = ({
  schedule,
  parentAColor,
  parentBColor,
  parentAName,
  parentBName
}: ScheduleCalendarProps) => {
  const calendarRef = useRef(null);

  if (!schedule) {
    return (
      <div className="h-96 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-center">
          <p className="text-lg font-medium">No schedule generated yet</p>
          <p className="text-sm">Complete the form and click "Generate Schedule"</p>
        </div>
      </div>
    );
  }

  const events = schedule.map((day: any) => ({
    title: day.parent,
    start: day.date,
    allDay: true,
    backgroundColor: day.parent === parentAName ? parentAColor : parentBColor,
    borderColor: day.parent === parentAName ? parentAColor : parentBColor,
    extendedProps: {
      isHoliday: day.holiday,
      holidayName: day.holidayName,
      isTransition: day.transition,
    }
  }));

  return (
    <div className="schedule-calendar">
      <style>{`
        /* Mobile-friendly calendar styles */
        @media (max-width: 768px) {
          .fc {
            font-size: 0.75rem;
          }
          .fc-toolbar {
            flex-direction: column;
            gap: 0.5rem;
          }
          .fc-toolbar-chunk {
            display: flex;
            justify-content: center;
          }
          .fc-toolbar-title {
            font-size: 1rem !important;
            margin: 0.25rem 0;
          }
          .fc-button {
            padding: 0.25rem 0.5rem !important;
            font-size: 0.75rem !important;
          }
          .fc-daygrid-day-number {
            font-size: 0.75rem;
            padding: 0.25rem;
          }
          .fc-col-header-cell-cushion {
            padding: 0.25rem;
            font-size: 0.7rem;
          }
          .fc-event-title {
            font-size: 0.65rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .fc-daygrid-event {
            margin: 1px 0 !important;
            padding: 1px 2px !important;
          }
          .fc-list-event-title {
            font-size: 0.75rem;
          }
          .fc-list-event-time {
            font-size: 0.7rem;
          }
        }
        
        /* Tablet adjustments */
        @media (min-width: 769px) and (max-width: 1024px) {
          .fc {
            font-size: 0.875rem;
          }
          .fc-toolbar-title {
            font-size: 1.25rem !important;
          }
          .fc-button {
            padding: 0.375rem 0.75rem !important;
            font-size: 0.875rem !important;
          }
        }
      `}</style>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,listYear'
        }}
        events={events}
        height="auto"
        contentHeight="auto"
        eventDidMount={(info) => {
          if (info.event.extendedProps.isHoliday) {
            info.el.style.border = '3px solid #7ED321';
            info.el.title = `${info.event.title} - ${info.event.extendedProps.holidayName}`;
          } else if (info.event.extendedProps.isTransition) {
            info.el.title = `${info.event.title} - Custody Transition`;
          }
        }}
      />
    </div>
  );
};

export default ScheduleCalendar;