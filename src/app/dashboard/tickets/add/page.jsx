import { AddForm } from "@/app/_components/AddTask/form"
import translateData from "@/utils/translateData"

async function fetchClients() {
    const response = await fetch('https://dgsoft.oncloud.gr/s1services/JS/DGHUB/TrdrCallHub', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            offset:1
        }),
         next: { revalidate: 600 } 
    })
    let data = await translateData(response)
    return data.result;

}


export default async function Page() {
    const clientsPromise = fetchClients();
    const [clients] = await Promise.all([clientsPromise]);
    

    return (
        <div>
            <AddForm  clients={clients}/>
        </div>
    )
}