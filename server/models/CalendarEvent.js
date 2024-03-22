import { model, models } from 'mongoose';
import mongoose from 'mongoose';


const calendarEventSchema = new mongoose.Schema({
    title: String,
    start: String,
    end: String,
    backgroundColor: String,
    description: String
},
{
  timestamps: true,
});

const CalendarEvent = models.CalendarEvent || model('CalendarEvent', calendarEventSchema);
export default CalendarEvent;