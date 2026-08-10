
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { getInventory } from "@/app/services/inventory"
import AddInventory from "./addinv"

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
    const data = await getInventory()
    return (
        <div className="mx-auto py-10 ml-2 w-full">
            <AddInventory />
             <DataTable columns={columns} data={data} filterColumn="department"/>
        </div>
    )
}