
"use server"
import translateData from "@/utils/translateData";
export async function getClients(pageParam, search) {
  
    const response = await fetch(`${process.env.NEXT_PUBLIC_SOFTONE}/TrdrCallHub`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            offset: pageParam,
            search: search
        }),
    })
    let data = await translateData(response)
    console.log(data.result)
    return data.result;
}


//ΕΠΑΦΕΣ ΤΟΥ ΚΑΘΕ ΠΕΛΑΤΗ:
export async function getCompanyContacts(trdr) {

    if(!trdr) return [];
 
    const response = await fetch(`${process.env.NEXT_PUBLIC_SOFTONE}/TrdprsnCallHub`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            trdr: trdr
        }),
    })
 
    let data = await translateData(response)
    console.log('data2')
    console.log(data)
    return data.result;
}



