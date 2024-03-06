
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


export default function DateTime({ label, onChange, selectedDate }) {
	const [date, setDate] =useState(new Date())

	const [state, setState] = useState({
		hour: 12,
		minutes: 0,
		date: selectedDate,
	})


	useEffect(() => {
		setState(prev => ({ ...prev, startDate: selectedDate, endDate: selectedDate }))
	}, [])

	const handleIncreaseInterval = (interval, name, limit) => {
		setState(prev => {
			if(prev[name] + interval >  limit) {
				return {
					...prev
				}
			};
			return {
				...prev, [name]: prev[name] + interval 
			}
		})
	}

	const handleDecreaseInterval = (interval, name, limit) => {
		setState(prev => {
			if(prev[name]  ==  limit) {
				return {
					...prev
				}
			};
			return {
				...prev, [name]: prev[name] - interval 
			}
		})
	}


	const handleChange = (e) => {
		const name = e.target.name;
		let value = e.target.value;
		
		setState(prev => ({ ...prev, [name]: parseInt(value) }))
	}

	const handleSelectDate = (e) => {
		let formated = format(e, "yyyy-MM-dd");
		setState(prev => ({...prev, date: formated  }))
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
						/>
					</PopoverContent>
				{/* Single Input */}
				<div className={styles.timeContainer}>
					<div className={styles.timeInput}>
						<input name="hour" onChange={handleChange} type="number" className={styles.timeSmallInput} value={state.hour} />
						<div className={styles.arrows}>
							<button onClick={() => handleIncreaseInterval(1, 'hour', 24)}>
								<ChevronUp />
							</button>
							<button onClick={() => handleDecreaseInterval(1, 'hour', 0)}>
								<ChevronDown  />
							</button>
						</div>
					</div>
					<span>:</span>
					{/* Single Input */}
					<div className={styles.timeInput}>
						<input name="minutes" onChange={handleChange} type="number" className={styles.timeSmallInput} value={state.minutes} />
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