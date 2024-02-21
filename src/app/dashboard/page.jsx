import CustomReport from "../_components/CustomReportTable"
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page() {
    // const  session = await getServerSession(authOptions);
    // console.log(session)
    // if(!session) {
    //     redirect('/login')

    // }
    return (
        <div>
            <CustomReport />
        </div>
    )
}