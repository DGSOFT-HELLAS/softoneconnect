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
		setState(prev => ({ ...prev, addEvent: false }))
	}


	//Handle to close the Edit form popup
	const handleCloseForm = (info) => {
		setState(prev => ({ ...prev, editEvent: false }))
	}



	const handleEvent = (name, value, extendedProps) => {

		if (extendedProps) {
			setState(prev => ({ ...prev, event: { ...prev.event, extendedProps: { ...prev.event.extendedProps, [name]: value } } }))
			return;
		}
		setState(prev => ({ ...prev, event: { ...prev.event, [name]: value } }))

	}




	const handleAddDate = (event) => {
		setState(prev => ({ ...prev, addEvent: true, event: { ...prev.event, date: event.dateStr } }))
	};


	const handleAddSubmit = () => {
		setEvents(prev => ([...prev, state.event]))
		setState(prev => ({ ...prev, addEvent: false, event: { title: '', start: '', end: '', extendedProps: { description: '' } } }))

	}


	const handleEdit = (info) => {
		setState(prev => ({ ...prev, editEvent: true }))
		const calendarApi = info.view.calendar;
		const event = calendarApi.getEventById(info.event.id);
		setState(prev => ({
			...prev,
			event: {
				title: event.title,
				start: event.start,
				end: event.end,
				extendedProps: {
					description: event.extendedProps.description
				}
			}
		}
		))

	};
	return (
		<div className={styles.wrapper}>
			<FullCalendar
				plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin,]}
				dateClick={(e) => handleAddDate(e)}
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
				dayMaxEventRows={2}

			/>
			<EditEvent
				event={state.event}
				open={state.editEvent}
				setOpen={handleCloseForm}
			/>
			<AddEvent
				open={state.addEvent}
				setOpen={handleOpenAddEvent}
				handleEvent={handleEvent}
				event={state.event}
				handleSubmit={handleAddSubmit}
				selectedDate={state.event.date} />
		</div>
	)
}





