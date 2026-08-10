"use client"

import { Dialog, DialogHeader, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Field } from "@/components/ui/field"
import { SquarePen } from "lucide-react"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { JobQueue } from "@/app/types/jobqueue";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { jobTable } from "@/db/schema";

type EditProps = {
    data: JobQueue
}

export default function EditTask({ data }: EditProps) {
    const fields = [
        { fId: "activity", fLabel: "Task", fPlaceholders: "Enter activity", fType: "input" },
        { fId: "assignee", fLabel: "Assignee", fPlaceholders: "(e.g Luke)", fType: "input" },
        { fId: "mjo", fLabel: "Job Order", fPlaceholders: "(e.g MJO#)", fType: "input" },
        {
            fId: "status", fLabel: "Status", fPlaceholders: "Enter activity", fOptions: [
                { label: "Pending", value: "Pending" },
                { label: "In Progress", value: "In Progress" },
            ], fType: "select"
        },
        { fId: "remarks", fLabel: "Remarks", fPlaceholders: "Enter remarks", fType: "input" }
    ];
    // Create handleEdit -------------**
    const [open,setOpen] = useState(false)
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const payload = {
            id: data.jobs_id,
            activity: formData.get("activity"),
            assignee: formData.get("assignee"),
            status: formData.get("status"),
            mjo: formData.get("mjo"),
            remarks: formData.get("remarks"),
        }

        const response = await fetch(`/api/jobqueue/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
  
        })
        console.log("Updated successfully")
        setOpen(false)
        router.refresh()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className={"hover:scale-110"}>
                <SquarePen />
            </DialogTrigger>

            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {fields.map((item) => (
                            <Field key={item.fId}
                            className={item.fId === "remarks" ? "sm:col-span-2" : ""}>
                                <Label>{item.fLabel}</Label>

                                {item.fType === "select" ? (
                                    <select
                                        name={item.fId}
                                        className="w-full rounded-md border border-gray-300 p-2"
                                        defaultValue={data[item.fId as keyof JobQueue] as string}
                                    >
                                        <option value="">Select {item.fLabel}</option>
                                        {item.fOptions?.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <Input
                                        placeholder={item.fPlaceholders}
                                        name={item.fId}
                                        defaultValue={data[item.fId as keyof JobQueue] as string}
                                        className={item.fId === "remarks" ? "h-20" : "w-full"}
                                    />
                                )}
                            </Field>
                        ))}
                    </div>
                    <div className="mt-5">
                        <Button className={"w-full"} type="submit">Save</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}