import { columns } from "./columns"
import { getHistory } from "@/app/services/history"
import { DataTable } from "../../../components/ui/data-table"

export default async function HistoryPage() {
    const data = await getHistory()
    return (
        <div className="mx-auto py-10 ml-2 w-full">
            <DataTable columns={columns} data={data} filterColumn="activity" />
        </div>
    )
}