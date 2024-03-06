'use client'
import React, { useState, useEffect } from 'react'
import elLocale from '@fullcalendar/core/locales/el';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list'; 
import interactionPlugin from "@fullcalendar/interaction" 
import EditEvent from './editEvent'
import AddEvent from './addEvent';
export default function RFullCalendar() {
  const [state, setState] = useState({
    editEvent: false,
    addEvent: false,
    date: null,
  })
  const [editModal, setEditModal] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Event 1',
      start: '2024-03-06 14:00',
      end: '2010-03-06 14:30:00',
      extendedProps: {
        description: 'Description 1'
      },
    
    },
    {
      id: 2,
      title: 'Event 2',
      start: '2024-03-06 10:00',
      end: '2024-03-06 10:20',
      extendedProps: {
        description: 'Description 2'
      },
    
    },

  ]);

  const handleOpenAddEvent = () => {
    setState(prev => ({...prev, addEvent:  false}))

  }


  useEffect(() => {
    console.log(state)
  }, [state])


  const handleEventAdd = (event) => {
    setState(prev => ({...prev, addEvent: true, date: event.dateStr}))
    console.log(event)

    
    // const title = prompt('Enter event title:');
    // if (!title) return; // User canceled

    // const days = prompt('Enter number of days for the event:');
    // if (!days || isNaN(days)) {
    //   alert('Please enter a valid number of days.');
    //   return;
    // }

    // const startDate = new Date(eventInfo.event.startStr);
    // const endDate = new Date(startDate);
    // endDate.setDate(startDate.getDate() + parseInt(days)); // Set the end date based on user input

    // setEvents([
    //   ...events,
    //   {
    //     title: title,
    //     start: startDate,
    //     end: endDate,
    //   },
    // ]);
    
  };


  const handleEventEdit = (info) => {
    setEditModal(true);
    const calendarApi = info.view.calendar;
    const event = calendarApi.getEventById(info.event.id);

    // const newTitle = prompt('Edit event title:', event.title);
    // const newDescription = prompt('Edit event description:', event.extendedProps.description);

    // if (newTitle !== null) {
    //   const updatedEvents = events.map((e) =>
    //     e.id === info.event.id
    //       ? {
    //           ...e,
    //           title: newTitle,
    //           description: newDescription,
    //         }
    //       : e
    //   );

    //   setEvents(updatedEvents);

    //   event.setProp('title', newTitle);
    //   event.setExtendedProp('description', newDescription);
    //   // calendarApi.updateEvent(event);
    // }
  };
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin,]}
        dateClick={(e) =>  handleEventAdd(e)}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        events={events}
        initialView='dayGridMonth'
        editable={true}
        eventClick={handleEventEdit}
        selectable={true}
        locale={elLocale}

      />
      <EditEvent open={state.editEvent} setOpen={setEditModal}   />
      <AddEvent open={state.addEvent} setOpen={handleOpenAddEvent} setEvents={setEvents} selectedDate={state.date}  />
    </>
  )
}





