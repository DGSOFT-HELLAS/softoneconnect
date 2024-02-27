
import { TicketsTable } from "@/app/_components/TicketsTable";
import translateData from "@/utils/translateData";
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BarChart from "@/app/_components/BarChart";
import TicketsPieChart from "@/app/_components/TicketsPieChart/PieChart";
import TicketsLineChart from "@/app/_components/TicketsLineChart";






const fetchTickets = async () => {
    const response = await fetch("https://dgsoft.oncloud.gr/s1services/JS/ARIADNE/testCRMWebClient", {
        method: 'POST',
        body: JSON.stringify({
            username: "Service",
            password: "Service",
        })
    });
    const _data = await translateData(response);
    let _parseData = JSON.parse(_data.result)
    return _parseData;
}


const Page = async () => {
    const data = await fetchTickets();
    console.log(data)
    const session = await getServerSession(authOptions);

    const ticketData = countTickets(data);
    const classifications = categorizeClasses(data);
    console.log



    if (!session) {
        console.log('no session')
        redirect('/login')
    }

    return (
        <>
            <div className="mb-4">
                <h2 className="text-3xl font-bold">{"Welcome back!"}</h2>
                <p className="text-muted-foreground">{"Here's some visualization and a list about Tickets!"}</p>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
                <div className="bg-background  radius-md">
                    <div className="mb-4 p-4 border-b text-muted-foreground border-background-main">
                        <h2 className="text-lg  spacing-1">{"Tickets per agent"}</h2>
                    </div>
                    <div className="p-4 ">
                        <BarChart data={ticketData} dataKeyX="initials"   />
                    </div>
                </div>
               
                <div className="bg-background  radius-md">
                    <div className="mb-4 p-4 border-b text-muted-foreground border-background-main">
                        <h2 className="text-lg">Ticketing Classification Data:</h2>
                    </div>
                    <div className="p-4 pb-0">
                        <TicketsPieChart data={classifications}   />
                    </div>
                </div>

               

            </div>
            <div className="mb-4 grid grid-cols-1">
            <div className="bg-background  radius-md">
                    <div className="mb-4 p-4 border-b text-muted-foreground border-background-main">
                        <h2 className="text-lg  spacing-1">{"Tickets per agent"}</h2>
                    </div>
                    <div className="p-4 ">
                        <TicketsLineChart   />
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <h2 className="text-3xl font-bold">{"Data Table"}</h2>
            </div>
            < TicketsTable data={data} />
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