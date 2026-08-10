"use client"

import { History } from "@/app/types/history"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { PrimaryKey } from "drizzle-orm/pg-core"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<History>[] = [
  {
    id: "activity",
    accessorKey: "jobs.activity",
    header: "Activity",
  },
  {
    accessorKey: "jobs.assignee",
    header: "Assignee",
  },
  {
    accessorKey: "history.dateFinished",
    header: "Finished Date",    
  },
  {
    accessorKey: "jobs.mjo",
    header: "Job Order #"
  },
  {
    accessorKey: "jobs.status",
    header: ({column}) => {
        return (
            <Button variant={"ghost"} onClick={() => column.toggleSorting(column.getIsSorted() === "desc")} >
                Status
            </Button>
        )
    }
    
  },
  {
    accessorKey: "jobs.remarks",
    header: "Remarks"
  },
  
]