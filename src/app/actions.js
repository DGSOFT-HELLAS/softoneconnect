
"use server"
import axios from "axios";
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
 
    return data.result;
}



export async function fetchUsers() {
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/users`)
        return data.result;
    } catch (e) {
        console.log(e)
        return []
    
    }
   
}




export async function handleSubmitTask(data, clientID) {
    console.log(data)
    console.log(clientID)
    const response = await fetch(`http://dgsoft.oncloud.gr/s1services`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            service: "setData",
            clientID: clientID,
            appId: "3000",
            OBJECT: "SOTASK",
            data: {
            SOACTION: [
                data
            ]
            }
        }),
    })
    try {
        let _data = await translateData(response)
        console.log(_data)
        return _data;
    } catch(e) {
        console.log(e)
    }
}


export async function softoneLogin(email) {
    console.log(email)
    const response = await fetch(`${process.env.NEXT_PUBLIC_SOFTONE}/LoginDGHUB`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: email
        }),
    })
    let data = await translateData(response)
    console.log(data)
    return data;
}
