import User from "../../../../server/models/User";
import connectMongo from "../../../../server/models/config";
import bcrypt from 'bcrypt';




export async function POST(req) {
        const response = {
            success: false,
            message: "Event not created",
            event: null
        }
        // await connectMongo();
        // try {
        //     let insert = await User.insertMany(users);
        //     response.success = true;
        //     response.message = "Users created";
        //     response.event = insert;

        // } catch (e) {
        //     console.log(e)
        // }
        // return Response.json(response)
        let cryptedPassword = await bcrypt.hash('123456', 10)
        let usersUpdate = await User.updateMany({}, {password: cryptedPassword})
        
          return Response.json({response: usersUpdate})
  }


  export async function GET(req) {
    const response = {
        success: false,
        error: "",
        message: "Event not created",
        result: [],
    }
    await connectMongo();
    try {
        let users = await User.find()
        response.result = users;
        response.success = true;
    } catch (e) {
        response.error = "Not able to fetch users"
    }
    return Response.json(response)
  }