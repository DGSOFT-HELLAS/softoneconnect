import User from '../../../../server/models/User'
import connectMongo from '../../../../server/models/config';
import bcrypt from 'bcrypt';
export async function POST(req) {
    
    const {email, password, name, surname} = await req.json();
    console.log(email, name, surname)
    let cryptedPassword = await bcrypt.hash(password, 10)
    try {
        await connectMongo()
        const searchEmail = await User.find({email: email})
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
        console.log('user')
        console.log(user)
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


