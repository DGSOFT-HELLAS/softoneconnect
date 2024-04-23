import { AddForm } from "@/app/_components/AddTask/form"
import axios from 'axios'


export default async function Page() {
    

    return (
        <div>
              <div className="mb-4">
                <h2 className="text-xl font-bold">📜 Nέο Τask!</h2>
                <h3 className="task_subheader">Κάντε μία νέα καταχώρηση</h3>
            </div>
            <AddForm />
        </div>
    )
}