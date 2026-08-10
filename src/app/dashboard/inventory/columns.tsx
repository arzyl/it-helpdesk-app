'use client'

import { ColumnDef } from "@tanstack/react-table";
import View from "./view";
import { Inventory } from "@/app/types/inventory";
import EditTask from "./edittask";

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
        id: "viewedit",
            size: 40,
            cell: ({ row }) => {
              return (
                  <EditTask data={row.original} />
              )
            }
    },
];