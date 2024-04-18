
import translateData from "@/utils/translateData";
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import Tasks from "@/app/_components/Tasks";


const fetchData = async (url, usercode) => {
    try {
        const response = await fetch(`https://dgsoft.oncloud.gr/s1services/JS/DGHUB/${url}`, {
            method: 'POST',
            body: JSON.stringify({
                usercode: usercode
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
   
    let usercode = session?.usercode;
    if (!session) {
        console.log('no session')
        redirect('/login')
    }


    //Fetch data from CRM
    const  callsPromise =  fetchData('testCRMCallsWebClient',  usercode  );
    const tasksPromise = fetchData('testCRMWebTaskClient', usercode );
    const [calls, tasks] = await Promise.all([callsPromise, tasksPromise]);

 
    return (
        <>
            <div className="mb-4">
                <h2 className="text-xl font-bold">👋 Καλημέρα!</h2>
                <h3 className="task_subheader">Δείτε όλα τα διαθέσιμα tasks σας!</h3>
            </div>
            <div>
                <Tasks  
                    user={session}
                    calls={calls}
                    tasks={tasks}
                />
            </div>
        </>
    )
}



export default Page;