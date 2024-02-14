import User from '../../../../server/models/User'

export async function POST() {
    
    const {email, password} = req.body;
    let user;
    try {
        user = User.create({
            email: email,
            password: password
        })
    } catch (e) {
        throw new Error('something went wrong. User was not created')
    }
    return Response.json({
        message: 'user created succesfully',
        user: user
    })
  }