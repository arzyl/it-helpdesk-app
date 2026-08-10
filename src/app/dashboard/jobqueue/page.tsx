import { columns } from "./columns"
import { DataTable } from "../../../components/ui/data-table"
import { getJob } from "@/app/services/jobqueue"
import AddTask from "./addtask"

export const dynamic = "force-dynamic";

export default async function JobQueuePage() {
    const data = await getJob()
    return (
        <div className="mx-auto py-10 ml-2 w-full">
            <AddTask />
            <DataTable columns={columns} data={data} filterColumn="activity" />
        </div>
    )
}