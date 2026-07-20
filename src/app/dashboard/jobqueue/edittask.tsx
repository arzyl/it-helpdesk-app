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

type EditProps = {
    data: JobQueue
}

export default function EditTask({ data }: EditProps) {
    const fields = [
        { fId: "activity", fLabel: "Task", fPlaceholders: "Enter activity" },
        { fId: "assignee", fLabel: "Assignee", fPlaceholders: "(e.g Luke)" },
        { fId: "status", fLabel: "Status", fPlaceholders: "Enter activity" },
    ];
    // Create handleEdit -------------**
    const [open,setOpen] = useState(false)
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const payload = {
            id: data.id,
            activity: formData.get("activity"),
            assignee: formData.get("assignee"),
            status: formData.get("status"),
        }

        const response = await fetch(`/api/jobqueue/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
        if (!response.ok) {
            console.error("Update failed")
            return
        }

        console.log("Updated successfully")
        setOpen(false)
        router.refresh()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <SquarePen />
            </DialogTrigger>

            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {fields.map((item) => (
                            <Field key={item.fId}>
                                <Label >{item.fLabel}</Label>
                                <Input placeholder={item.fPlaceholders} name={item.fId} readOnly={item.fId == "activity"} defaultValue={data[item.fId as keyof JobQueue]} />
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