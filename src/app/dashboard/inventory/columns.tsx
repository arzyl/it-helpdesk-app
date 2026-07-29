'use client'

import { ColumnDef } from "@tanstack/react-table";
import View from "./view";
import { Inventory } from "@/app/types/inventory";

export const columns: ColumnDef<Inventory>[] = [
    {
        accessorKey: "userinvTable.username",
        header: "Username"
    },
    {
        id: "department",
        accessorKey: "userinvTable.department",
        header: "Department"
    },
    {
        accessorKey: "userinvTable.position",
        header: "Position"
    },
    {
        id: "action",
        cell: ({row}) => {
            return (
                <div><View data={row.original} /></div>
            )
        }
    },
];