import User from '../../../../server/models/User'
import connectMongo from '../../../../server/models/config';
export async function POST(req, res) {
    
    const {email, password} = req.body;

    console.log(email, password )
    let user;
    try {
        await connectMongo()
        user = await User.create({
            email: email,
            password: password
        })
        console.log('user')
        console.log(user)
       
    } catch (e) {
        throw new Error('something went wrong. User was not created')
    }
    return Response.json({
        user: user
    })
  }