
import axios from 'axios';
export async function logout() {
    try {
        let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`
        console.log(url)
        let {data} = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/logout`)
        return data;
    } catch (e) {
        console.log(e)
        throw new Error('Error logging out')
    } 
   
  
}