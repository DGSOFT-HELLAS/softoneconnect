'use client'
import React, { useState, useEffect, useReducer } from 'react'
import elLocale from '@fullcalendar/core/locales/el';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list'; 
import interactionPlugin from "@fullcalendar/interaction" 
import EditEvent from './editEvent'
import AddEvent from './addEvent';
import styles from './calendar.module.css'


function addEventReducer(state, action) {
  switch (action.type) {
    case 'SET_ADD_EVENT':
      return { ...state, addEvent: action.payload };
    case 'SET_EVENT_DATE':
      return { ...state, event: { ...state.event, date: action.payload } };
    // Add other cases for different state transitions
    default:
      return state;
  }
}


export default function RFullCalendar() {

  
  const [state, setState] = useState({
    editEvent: false,
    addEvent: false,
    event: {
      title: '',
      start: '',
      end: '',
      extendedProps: {
        description: ''
      },
    }
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

  useEffect(() => {
    console.log('state')
    console.log(state)
  }, [state])

  const handleOpenAddEvent = () => {
    setState(prev => ({...prev, addEvent:  false}))

  }

 
  const handleEvent = (name, value) => {
    setState(prev => ({...prev, event: {...prev.event, [name]: value}}))
  }



  
  const handleAdd = (event) => {
    setState(prev => ({...prev, addEvent: true, event: {...prev.event, date: event.dateStr}}))
  };


  const handleEdit = (info) => {
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
    <div className={styles.wrapper}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin,]}
        dateClick={(e) =>  handleAdd(e)}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        events={events}
        initialView='dayGridMonth'
        editable={true}
        eventClick={handleEdit}
        selectable={true}
        locale={elLocale}

      />
      <EditEvent open={state.editEvent} setOpen={setEditModal}   />
      <AddEvent 
        open={state.addEvent} 
        setOpen={handleOpenAddEvent} 
        handleEvent={handleEvent}
        event={state.event}
        //Used for the calendar component to display the selected date from the calendar:
        selectedDate={state.event.date}  />
    </div>
  )
}





