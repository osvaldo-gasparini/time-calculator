<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  
  interface Task {
    id: string;
    title: string;
    start: Date;
    end: Date;
  }
  
  let calendarContainer: HTMLDivElement;
  let tasks = writable<Task[]>([]);
  
  onMount(async () => {
    // Dynamically import React components
    const React = await import('react');
    const ReactDOM = await import('react-dom/client');
    const { Calendar, momentLocalizer, Views } = await import('react-big-calendar');
    const moment = await import('moment');
    
    // Import drag and drop addon
    const withDragAndDrop = (await import('react-big-calendar/lib/addons/dragAndDrop')).default;
    
    // Create DragAndDropCalendar
    const DragAndDropCalendar = withDragAndDrop(Calendar);
    
    // Load CSS files
    const loadCSS = (href) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    };
    
    // Load required CSS
    loadCSS('https://unpkg.com/react-big-calendar/lib/css/react-big-calendar.css');
    loadCSS('https://unpkg.com/react-big-calendar/lib/addons/dragAndDrop/styles.css');
    
    const localizer = momentLocalizer(moment.default);
    
    let currentTasks: Task[] = [];
    
    tasks.subscribe(value => {
      currentTasks = value;
    });
    
    const CalendarComponent = () => {
      const [events, setEvents] = React.useState(currentTasks);
      
      const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
        const title = prompt('Enter task name:');
        if (title) {
          const newTask: Task = {
            id: Date.now().toString(),
            title,
            start,
            end
          };
          
          const updatedEvents = [...events, newTask];
          setEvents(updatedEvents);
          tasks.set(updatedEvents);
        }
      };
      
      const handleSelectEvent = (event: Task) => {
        const newTitle = prompt('Edit task name:', event.title);
        if (newTitle !== null) {
          const updatedEvents = events.map(e => 
            e.id === event.id ? { ...e, title: newTitle } : e
          );
          setEvents(updatedEvents);
          tasks.set(updatedEvents);
        }
      };
      
      const handleEventDrop = ({ event, start, end }: { event: Task; start: Date; end: Date }) => {
        const updatedEvents = events.map(e => 
          e.id === event.id ? { ...e, start, end } : e
        );
        setEvents(updatedEvents);
        tasks.set(updatedEvents);
      };
      
      const handleEventResize = ({ event, start, end }: { event: Task; start: Date; end: Date }) => {
        const updatedEvents = events.map(e => 
          e.id === event.id ? { ...e, start, end } : e
        );
        setEvents(updatedEvents);
        tasks.set(updatedEvents);
      };
      
      return React.createElement(DragAndDropCalendar, {
        localizer,
        events,
        startAccessor: 'start',
        endAccessor: 'end',
        style: { height: 'calc(100vh - 8rem)' },
        selectable: true,
        resizable: true,
        onEventDrop: handleEventDrop,
        onEventResize: handleEventResize,
        onSelectSlot: handleSelectSlot,
        onSelectEvent: handleSelectEvent,
        views: [Views.WEEK, Views.DAY],
        defaultView: Views.DAY,
        step: 15,
        timeslots: 4,
        min: new Date(2024, 0, 1, 6, 0, 0),
        max: new Date(2024, 0, 1, 22, 0, 0),
        formats: {
          timeGutterFormat: 'HH:mm',
          eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }, culture: string, localizer: any) => {
            return localizer.format(start, 'HH:mm', culture) + ' - ' + localizer.format(end, 'HH:mm', culture);
          }
        },
        popup: true
      });
    };
    
    // Create React root and render
    const root = ReactDOM.createRoot(calendarContainer);
    root.render(React.createElement(CalendarComponent));
    
    return () => {
      root.unmount();
    };
  });
</script>

<div class="tracker-container">
  <div class="tracker-header">
    <h2>Task Tracker</h2>
    <p>Click on the calendar to create tasks. Drag and resize to adjust timing.</p>
  </div>
  
  <div class="calendar-wrapper">
    <div bind:this={calendarContainer} class="calendar-container"></div>
  </div>
</div>

<style>
  .tracker-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  .tracker-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .tracker-header h2 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--neutral-800);
    margin: 0 0 0.5rem 0;
  }
  
  .tracker-header p {
    color: var(--neutral-600);
    margin: 0;
  }
  
  .calendar-wrapper {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    overflow: hidden;
  }
  
  .calendar-container {
    width: 100%;
  }
  
  /* Custom styles for react-big-calendar */
  :global(.rbc-calendar) {
    font-family: 'Inter', system-ui, sans-serif;
  }
  
  :global(.rbc-event) {
    background-color: var(--primary) !important;
    border: none !important;
    border-radius: 6px !important;
    padding: 4px 8px !important;
    font-weight: 500 !important;
  }
  
  :global(.rbc-event:hover) {
    background-color: var(--primary-light) !important;
  }
  
  :global(.rbc-time-slot) {
    border-top: 1px solid var(--neutral-200) !important;
  }
  
  :global(.rbc-time-gutter) {
    background: var(--neutral-50) !important;
  }
  
  :global(.rbc-header) {
    background: var(--neutral-100) !important;
    font-weight: 600 !important;
    color: var(--neutral-700) !important;
    padding: 0.75rem !important;
  }
  
  :global(.rbc-today) {
    background-color: rgba(37, 99, 235, 0.05) !important;
  }
  
  :global(.rbc-toolbar) {
    margin-bottom: 1rem !important;
  }
  
  :global(.rbc-btn-group button) {
    background: white !important;
    border: 1px solid var(--neutral-300) !important;
    color: var(--neutral-700) !important;
    padding: 0.5rem 1rem !important;
    font-weight: 500 !important;
  }
  
  :global(.rbc-btn-group button:hover) {
    background: var(--neutral-100) !important;
  }
  
  :global(.rbc-btn-group button.rbc-active) {
    background: var(--primary) !important;
    color: white !important;
    border-color: var(--primary) !important;
  }
  
  @media (max-width: 768px) {
    .tracker-container {
      padding: 1rem 0.5rem;
    }
    
    .calendar-wrapper {
      padding: 1rem;
      border-radius: 8px;
    }
    
    .tracker-header h2 {
      font-size: 1.5rem;
    }
  }
</style>