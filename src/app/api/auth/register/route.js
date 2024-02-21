import connectMongo from '../../../../../server/models/config';
import bcrypt from 'bcrypt';
import User from '../../../../../server/models/User';

export async function POST(req) {
    
    const {email, password, name, surname} = await req.json();
    console.log(email, name, surname)
    let cryptedPassword = await bcrypt.hash(password, 10)
    console.log(cryptedPassword)
    try {
        await connectMongo()
        const searchEmail = await User.findOne({email: email})
        console.log(searchEmail)
        if(searchEmail) {
            return Response.json({
                success: false,
                message: 'This email already exists'
            })
        }

       const user = await User.create({
            email: email,
            password: cryptedPassword,
            name: name,
            surname: surname,
            role: 'user'
        })
       
        return Response.json({
            success: true,
            message: "User created",
            user: user
        })
       
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
   
  }


