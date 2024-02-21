import CustomReport from "../_components/CustomReportTable"
import { getServerSession } from "next-auth/next"
import {authOptions} from '../../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function Page() {
    const  session = await getServerSession(authOptions);
    console.log(session)
    if(!session) {
        redirect('/login')

    }
    return (
        <div>
            <CustomReport />
        </div>
    )
}