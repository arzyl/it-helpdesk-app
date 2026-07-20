"use client"

import { ColumnDef } from "@tanstack/react-table"
import { JobQueue } from "@/app/types/jobqueue";
import { Button } from "@/components/ui/button";
import EditTask from "./edittask";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<JobQueue>[] = [
  {
    accessorKey: "activity",
    header: "Activity",
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
  },
  {
    accessorKey: "status",
    header: ({column}) => {
        return (
            <Button variant={"ghost"} onClick={() => column.toggleSorting(column.getIsSorted() === "desc")} >
                Status
            </Button>
        )
    }
    
  },
  {
    accessorKey: "dateCreated",
    header: "Date Created",
    cell: ({ row }) => {
    const date = row.getValue("dateCreated") as string;

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  },
  },
  {
    id: "action",
    cell: ({row}) => {
        return(
           <EditTask data={row.original}/>
        )
    }
  }
]