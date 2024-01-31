
import { ValidateEmail } from "@/app/_components/ForgotPassword";
const Page = () => {
    return (
           <div className="auth_container">
           <div className="auth_form_container">
               <div className="register_text">
                   <h1>Change your password</h1>
                   <p>Enter email and will we send you a link to change your password</p>
               </div>
               <ValidateEmail />
           </div>
       </div>
    )
}


export default Page;