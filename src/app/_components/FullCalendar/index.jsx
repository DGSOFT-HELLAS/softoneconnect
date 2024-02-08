'use client'
import React, { useState, useEffect } from 'react'
import elLocale from '@fullcalendar/core/locales/el';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'; // Import timeGridPlugin for week and day views
import listPlugin from '@fullcalendar/list'; // Import listPlugin for list view
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import EditEvent from './editEvent'
export default function RFullCalendar() {
  const [newEvent, setNewEvent] = useState()
  const [editEvent, setEditEvent] = useState()
  const [editModal, setEditModal] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Event 1',
      start: '2024-02-08 10:00:00',
      end: '2024-02-10: 00:00:00',
      extendedProps: {
        description: 'Description 1'
      },
    
    },
    {
      id: 2,
      title: 'Event 2',
      start: '2024-02-10 10:00:00',
      end: '2024-02-10 10:20:00',
      extendedProps: {
        description: 'Description 2'
      },
    
    },

  ]);



  const handleEventAdd = (eventInfo) => {
    const title = prompt('Enter event title:');
    if (!title) return; // User canceled

    const days = prompt('Enter number of days for the event:');
    if (!days || isNaN(days)) {
      alert('Please enter a valid number of days.');
      return;
    }

    const startDate = new Date(eventInfo.event.startStr);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + parseInt(days)); // Set the end date based on user input

    setEvents([
      ...events,
      {
        title: title,
        start: startDate,
        end: endDate,
        description: '',
      },
    ]);
  };


  const handleEventEdit = (info) => {
    setEditModal(true);
    const calendarApi = info.view.calendar;
    const event = calendarApi.getEventById(info.event.id);
    console.log(event.title)
    console.log(event.description)
    console.log(event.start)
    console.log(event.extendedProps.description)

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
        dateClick={() => console.log('date clicked')}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        events={events}
        initialView='dayGridMonth'
        editable={true}
        even
        eventClick={handleEventEdit}
        selectable={true}
        locale={elLocale}
        select={(info) => {
            console.log(info)
            const title = prompt('Enter event title:');
           if (title) {
               handleEventAdd({ event: { title, startStr: info.startStr } });
            }
          }}
          eventContent={renderEventContent}

      // selectMirror={true}
      // resources={[
      //   { id: 'a', title: 'Auditorium A' },
      //   { id: 'b', title: 'Auditorium B', eventColor: 'green' },
      //   { id: 'c', title: 'Auditorium C', eventColor: 'orange' },
      // ]}
      // initialEvents={[
      //   { title: 'nice event', start: new Date(), resourceId: 'a' }
      // ]}
      // initialView="dayGridMonth"
      // weekends={true}
      // dateClick={() => console.log('date clicked')}

      // events={events}
      // editable={true} 
      // selectable={true} 
      // select={(info) => {
      //   console.log(info)
      //   const title = prompt('Enter event title:');
      //   if (title) {
      //     handleEventAdd({ event: { title, startStr: info.startStr } });
      //   }
      // }}
      // eventClick={handleEventEdit} // Attach the eventClick handler for editing
      />
      <EditEvent open={editModal} setOpen={setEditModal} />
    </>
  )
}


function renderEventContent(eventInfo) {
  return (
    <div >
      <i>{eventInfo.event.title}</i>
    </div>
  )
}


