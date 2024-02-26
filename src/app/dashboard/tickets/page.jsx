
import { TicketsTable } from "@/app/_components/TicketsTable";
import translateData from "@/utils/translateData";
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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
    const  session = await getServerSession(authOptions);
    console.log('thing is here we should be able to see the session')
    console.log(session)
   
    if(!session) {
        console.log('no session')
        redirect('/login')
    }

    return (
        <>
            <div className="mb-4">
                <h2 className="text-3xl font-bold">{"Welcome back!"}</h2>
                <p className="text-muted-foreground">{"Here's a list of your tasks for this month!"}</p>
            </div>
            < TicketsTable data={data} />
        </>
    )
}

export default Page;