
import translateData from "@/utils/translateData";
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import Tasks from "@/app/_components/Tasks";


const fetchData = async (url) => {
    try {
        const response = await fetch(`https://dgsoft.oncloud.gr/s1services/JS/ARIADNE/${url}`, {
            method: 'POST',
            body: JSON.stringify({
                username: "Service",
                password: "Service",
                usercode: 1,
            })
        });

        const _data = await translateData(response);
        return _data.result;
    } catch (e) {
        console.log(e)
        return e;
    }

}






const Page = async () => {
    const session = await getServerSession(authOptions);
    
    if (!session) {
        console.log('no session')
        redirect('/login')
    }


    //Fetch data from CRM
    const  callsPromise =  fetchData('testCRMCallsWebClient');
    const tasksPromise = fetchData('testCRMWebClient');
    //Promisify the data 
    const [calls, tasks] = await Promise.all([callsPromise, tasksPromise]);
    console.log(tasks)

    return (
        <>
            <div className="mb-4">
                <h2 className="text-3xl font-bold">{"Welcome back!"}</h2>
            </div>
            <div>
                <Tasks  
                    calls={calls}
                    tasks={tasks}
                />
            </div>
        </>
    )
}


function countTickets(tickets) {
   
    const agentTicketCounts = [];

    tickets.forEach(ticket => {
        // Get the agent name
        const agent = ticket.ACTOR;
        const initials = agent.split(' ').map(name => name[0]).join('');
      
        // Find the index of the agent in the agentTicketCounts array
        const agentIndex = agentTicketCounts.findIndex(item => item.agent === agent);
      
        // If the agent is not in the agentTicketCounts array, add a new object
        if (agentIndex === -1) {
          agentTicketCounts.push({ agent, total: 1, initials });
        } else {
          // If the agent is already in the agentTicketCounts array, increment the total count
          agentTicketCounts[agentIndex].total++;
        }
      });
      return agentTicketCounts;
}


function categorizeClasses(tickets) {
    const classCounts = [];

    tickets.forEach(ticket => {
        const classification = ticket['Χαρακτηρισμός'];
        const index = classCounts.findIndex(item => item['Χαρακτηρισμός'] == classification);
        if (index === -1) {
            classCounts.push({ 'Χαρακτηρισμός': classification, total: 1, date: getRandomDate('2023-01-01', '2024-12-31')});
        } else {
          classCounts[index].total++;
        }
      });
      return classCounts;
}

function getRandomDate(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    return randomDate.toISOString(); // Convert to ISO string format
  }
  

export default Page;