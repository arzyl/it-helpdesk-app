"use client"

import { ColumnDef } from "@tanstack/react-table"
import { JobQueue } from "@/app/types/jobqueue";
import { Button } from "@/components/ui/button";
import EditTask from "./edittask";
import Completed from "./completed";
import View from "./view";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<JobQueue>[] = [
  {
    accessorKey: "activity",
    header: "Activity",
    size: 250,
    cell: ({ getValue }) => {
    const value = getValue() as string;

    return (
      <div
        className="max-w-[200px] truncate "
        title={value}
      >
        {value}
      </div>
    );}
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
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
    accessorKey: "mjo",
    header: "Job Order #"
  },
  {
    id: "action",
    size: 40,
    cell: ({ row }) => {
      return (
          <EditTask data={row.original} />
      )
    }
  },
  {
    id: "action2",
    size: 40,
    cell: ({ row }) => {
      return (
        <div className="w-0 hover:scale-105">
          <View data={row.original} />
        </div>
      )
    }
  },
  {
    id: "action1",
    size: 40,
    cell: ({ row }) => {
      return (
        <div className="w-0">
          <Completed complete={row.original} />
        </div>
      )
    }
  },
]