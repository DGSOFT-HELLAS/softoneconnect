
import { DataTableDemo } from "@/app/_components/TableExample";

const Page = async () => {

  
    return (
        <>
            <div className="mb-4">
                <h2 className="text-3xl font-bold">{"Welcome back!"}</h2>
                <p className="text-muted-foreground">{"Here's a list of your tasks for this month!"}</p>
            </div>
            < DataTableDemo />
        </>
    )
}

export default Page;