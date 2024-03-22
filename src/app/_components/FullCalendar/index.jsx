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
import axios from 'axios'



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
			title: 'Επισκευή Καλογεράκης',
			start: '2024-03-21 14:00',
			end: '2010-03-21 14:30:00',
			backgroundColor: '#FF5733',
			extendedProps: {
				description: 'Description 1'
			},

		},
		{
			id: 2,
			title: 'Πελάτης Διαμαντόπουλος',
			start: '2024-03-21 15:00',
			end: '2010-03-21 15:30:00',
			backgroundColor: '#53af1e',
			extendedProps: {
				description: 'Description 1'
			},

		},
		{
			id: 3,
			title: 'Επανεφοδιασμός',
			backgroundColor: '#ff33f5',
			start: '2024-03-22 10:00',
			end: '2024-03-22 10:20',
			extendedProps: {
				description: 'Description 2'
			},

		},
		{
			id: 3,
			title: 'Πελάτης Καλογεράκης',
			start: '2024-03-22 10:00',
			end: '2024-03-22 10:20',
			backgroundColor: '#53af1e',
			extendedProps: {
				description: 'Description 2'
			},

		},
		{
			id: 3,
			title: 'Πελάτης Καλογεράκης',
			start: '2024-03-22 10:00',
			end: '2024-03-22 10:20',
			backgroundColor: '#53af1e',
			extendedProps: {
				description: 'Description 2'
			},

		},
		{
			id: 3,
			title: 'Πελάτης Καλογεράκης',
			start: '2024-03-23 10:00',
			end: '2024-03-23 10:20',
			backgroundColor: '#53af1e',
			extendedProps: {
				description: 'Description 2'
			},

		},
		{
			id: 3,
			title: 'Πελάτης Καλογεράκης',
			start: '2024-03-23 10:00',
			end: '2024-03-23 10:20',
			backgroundColor: '#53af1e',
			extendedProps: {
				description: 'Description 2'
			},

		},
		{
			id: 3,
			title: 'Πελάτης Καλογεράκης',
			start: '2024-03-23 10:00',
			end: '2024-03-24 10:20',
			extendedProps: {
				description: 'Description 2'
			},

		},

	]);



	useEffect(() => {
		console.log(state.event)
		console.log(state.events)
	}, [state, events])
	const handleOpenAddEvent = () => {
		setState(prev => ({ ...prev, addEvent: false }))
	}


	//Handle to close the Edit form popup
	const handleCloseForm = (info) => {
		setState(prev => ({ ...prev, editEvent: false }))
	}



	const handleEvent = (name, value, extendedProps) => {

		if (extendedProps) {
			setState(prev => ({ ...prev, event: { ...prev.event, extendedProps: { ...prev.event.extendedProps, [name]: value, backgroundColor: '#FF5733'} } }))
			return;
		}
		setState(prev => ({ ...prev, event: { ...prev.event, [name]: value } }))

	}




	const handleAddDate = (event) => {
		setState(prev => ({ ...prev, addEvent: true, event: { ...prev.event, date: event.dateStr } }))
	};


	const handleAddSubmit = async () => {
		setEvents(prev => ([...prev, state.event]))
		const {data} = await axios.post('/api/calendarEvents', {
			title: state.event.title,
			start: state.event.start,
			end: state.event.end,
			backgroundColor: state.event.backgroundColor,
			description: state.event.extendedProps.description
		})
		console.log('data')
		console.log(data)
		//Clears previous state of the event and closes the popup
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
				dayMaxEventRows={4}

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





