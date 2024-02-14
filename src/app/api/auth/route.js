import { MdOutlineWifiPassword } from 'react-icons/md';
import User from '../../../../server/models/User'
import connectMongo from '../../../../server/models/config';
export async function POST(req) {
    
    const {email, password} = await req.json();
    let user;
    try {
        await connectMongo()
        user = await User.create({
            email: email,
            password: password
        })
     
       
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
    return Response.json({
        user: user
    })
  }


export async function GET(req) {
    console.log('login api')
    const url = new URL(req.url)

    const pass = url.searchParams.get("pass")
    console.log('pass')
    console.log(pass)
    const email = url.searchParams.get("email")
    let response = {
        user: null,
        message: null,
    }
    try {
        await connectMongo()
        response.user = await User.findOne({email: email})
        let _dbpassword = response.user.password;

        if(_dbpassword !== pass) {
            response.message = "Wrong credentials"
            response.user = null;
        } 
        else if(!response.user) {
            response.message = "User not found. Try again"
            response.user = null;
        } else {
            response.message = "Succesfull login"
        }
       
        

        
       
       

       
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
    return Response.json(response)
}   