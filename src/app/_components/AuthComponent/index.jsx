import {redirect} from 'next/navigation'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
const AuthComponent = async ({redirectTo}) => {
    const  session = await getServerSession(authOptions);
    if(!session) {
        redirect(redirectTo)
    }


    return (
        <div>
            <h1>AuthComponent</h1>
            <p>You are not authorized to see this content</p>
            <p>You will be redirected to the login page</p>
        </div>
    )
}

export default AuthComponent;