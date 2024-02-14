import { MdOutlineWifiPassword } from 'react-icons/md';
import User from '../../../../server/models/User'
import connectMongo from '../../../../server/models/config';
export async function POST(req) {
    
    const {email, password} = await req.json();
    console.log(email, password)
    let user;
    try {
        console.log('1')
        await connectMongo()
        console.log('2')
        user = await User.create({
            email: email,
            password: password
        })
        console.log('user')
        console.log(user)
       
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
    return Response.json({
        user: user
    })
  }