import { columns } from "./columns"
import { DataTable } from "./data-table"
import { getJob } from "@/app/services/jobqueue"
import AddTask from "./addtask"

export default async function JobQueuePage() {
    const data = await getJob()
    return (
        <div className="container mx-auto py-10 ml-2 ">
            <AddTask />
            <DataTable columns={columns} data={data} />
        </div>
    )
}