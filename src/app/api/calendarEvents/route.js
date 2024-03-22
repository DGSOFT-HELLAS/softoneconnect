import connectMongo from '../../../../server/models/config';
import CalendarEvent from '../../../../server/models/CalendarEvent';


export async function POST(req) {
    console.log('test')
    const {title, start, end, backgroundColor, extendedProps} = await req.json();
    console.log(title, start, end, backgroundColor, extendedProps)
    try {
        await connectMongo()
        const event = await CalendarEvent.create({
            title: title,
            start: start,
            end: end,
            backgroundColor: backgroundColor,
            extendedProps: extendedProps
        })
        
        return Response.json({
            success: true,
            message: "Event created",
            event: event
        })
       
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
    
   
  }