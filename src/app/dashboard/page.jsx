import CustomReport from "../_components/CustomReportTable"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AuthComponent from "../_components/AuthComponent";
export default async function Page() {
    const  session = await getServerSession(authOptions);
    
    if(!session) {
        return (
            <AuthComponent redirectTo="/login" />
        )
    }
    return (
        <div>
            <CustomReport />
        </div>
    )
}