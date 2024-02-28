import Image from "next/image";
import {redirect} from 'next/navigation'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
export default async function Home() {

  const  session = await getServerSession(authOptions);
    if(!session) {
        redirect('/login')
    }

    if(session) {
        redirect('/dashboard/tickets')
    }
 
export default function Home() {
  return (
    <div>
      hello my gorgeous friends  of the internet!!
    </div>
  );
}
