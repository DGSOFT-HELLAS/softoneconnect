
import { TicketsTable } from "@/app/_components/TicketsTable";
import translateData from "@/utils/translateData";
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BarChart from "@/app/_components/BarChart";
import Image from 'next/image';

const images = [
    'avatar1.jpg', 
    'avatar1.jpg', 
    'avatar1.jpg',
    'avatar1.jpg',
    'avatar1.jpg',
    'avatar1.jpg',
];

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

    if (!session) {
        console.log('no session')
        redirect('/login')
    }

    return (
        <>
            <div className="mb-4">
                <h2 className="text-3xl font-bold">{"Welcome back!"}</h2>
                <p className="text-muted-foreground">{"Here's some v and a list about Tickets!"}</p>
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
                        <h2 className="text-lg font-bold ">{"Welcome back!"}</h2>
                    </div>
                    <div className="p-4 pb-0">
                        <BarChart />
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


const CustomImageBar = ({ x, y, width, height, value, index }) => {
    // Assuming you have an array of image URLs
    return (
      <g transform={`translate(${x},${y})`}>
        <Image
            style={{borderRadius: '50%'}}
          x={width / 2 - 10} 
          y={-10} 
          width={20} 
          height={20} 
          src={images[index]}
          alt={`Image ${index}`}
        />
      </g>
    );
  };

export default Page;