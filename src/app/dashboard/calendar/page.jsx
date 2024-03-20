import RFullCalendar from "@/app/_components/FullCalendar"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AuthComponent from "@/app/_components/AuthComponent";
import { getServerSession } from "next-auth/next"


const Page = async () => {

    const  session = await getServerSession(authOptions);
    if(!session) {
        return (
            <AuthComponent redirectTo="/login" />
        )
    }
    return (
        <div>
            <RFullCalendar />
        </div>
    )
}

export default Page;