
import { Calendar as CalendarIcon, ChevronUp, ChevronDown } from 'lucide-react';
import { Label } from '@/components/ui/label'
import styles from './timepicker.module.css'
import { useEffect, useState } from 'react';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { el } from 'date-fns/locale';
import { format } from "date-fns";


export default function DateTime({ label, selectedDate, handleEvent }) {

	const [state, setState] = useState({
		hour: '12',
		minutes: '00',
		date: selectedDate,
	})


	useEffect(() => {
		setState(prev => ({ ...prev, startDate: selectedDate, endDate: selectedDate }))

	}, [])



	useEffect(() => {
		console.log(state)
	}, [state])

	const handleIncreaseInterval = (interval, name, limit) => {
		
		setState(prev => {
			
			// If the value is already at the limit, return the previous state
			if (parseInt(prev[name]) + interval > limit) {
				return {
					...prev
				}
			};

			let increase = parseInt(prev[name]) + interval;
			increase = increase < 10 ? `0${increase}` : increase.toString();
			return {
				...prev, [name]: increase
			}
		})
	}

	const handleDecreaseInterval = (interval, name, limit) => {
		setState(prev => {
			if (parseInt(prev[name]) == limit) {
				return {
					...prev
				}
			};
			let increase = parseInt(prev[name]) - interval;
			increase = increase < 10 ? `0${increase}` : increase.toString();
			return {
				...prev, [name]: increase
			}
		})
	}


	const handleChange = (e, limit) => {
		let condition = e.target.value.length > 2 || e.target.value > limit || e.target.value < 0 ;
		if(condition) return;

		const name = e.target.name;
		let value =  e.target.value ;
		value = (parseInt(value) < 10 && parseInt(value) >= 5) ? `0${value}` : value
		setState(prev => ({ ...prev, [name]:  value}))
	}

	const handleSelectDate = (e) => {
		let formated = format(e, "yyyy-MM-dd");
		setState(prev => ({ ...prev, date: formated }))
	}
	return (
		<Popover>
			<div className="w-full ">
				<Label htmlFor="message">{label}</Label>
				<div className={styles.inputContainer}>
					<PopoverTrigger asChild>
						<div className={styles.hourContainer}>
							<CalendarIcon />
							<span>
								{state.date}
							</span>
						</div>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0 mt-4" align="start">
						<Calendar
							mode="single"
							locale={el}
							onSelect={handleSelectDate}
							selected={new Date(state.date)}
						/>
					</PopoverContent>
					{/* Single Input */}
					<div className={styles.timeContainer}>
						<div className={styles.timeInput}>
							<input name="hour" onChange={(e) => handleChange(e, 24)} type="number" className={styles.timeSmallInput} value={state.hour} />
							<div className={styles.arrows}>
								<button onClick={() => handleIncreaseInterval(1, 'hour', 24)}>
									<ChevronUp />
								</button>
								<button onClick={() => handleDecreaseInterval(1, 'hour', 0)}>
									<ChevronDown />
								</button>
							</div>
						</div>
						<span>:</span>
						{/* Single Input For setting time */}
						<div className={styles.timeInput}>
							<input name="minutes" onChange={(e) => handleChange(e)} type="text" className={styles.timeSmallInput} value={state.minutes} />
							<div className={styles.arrows}>
								<button onClick={() => handleIncreaseInterval(5, 'minutes', 60)}>
									<ChevronUp />
								</button>
								<button onClick={() => handleDecreaseInterval(5, 'minutes', 0)}>
									<ChevronDown />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Popover>
	)
}