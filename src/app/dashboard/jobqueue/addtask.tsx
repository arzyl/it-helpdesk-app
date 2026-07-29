"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddTask() {
    const fields = [
        { fId: "activity", fLabel: "Task", fPlaceholders: "Enter activity", fType: "input" },
        { fId: "assignee", fLabel: "Assignee", fPlaceholders: "(e.g Luke)", fType: "input" },
        { fId: "mjo", fLabel: "Job Order", fPlaceholders: "(e.g MJO#)", fType: "input" },
        {
            fId: "status", fLabel: "Status", fPlaceholders: "Enter activity", fOptions: [
                { label: "Pending", value: "Pending" },
                { label: "In Progress", value: "In Progress" },
                { label: "Completed", value: "Completed" },
            ], fType: "select"
        },
    ];
    const router = useRouter();
    const [open, setOpen] = useState(false);
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault();
        const body = {
            ...Object.fromEntries(new FormData(e.currentTarget))
        }
        const response = await fetch("http://localhost:3000/api/jobqueue", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        router.refresh();
        setOpen(false);
        if (!response.ok) {
            throw new Error("Failed to create job");

        }
        return response.json();

    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button className={"mb-1 w-full"} />}>
                Add Task
            </DialogTrigger>

            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {fields.map((item) => (
                            <Field key={item.fId}>
                                <Label>{item.fLabel}</Label>

                                {item.fType === "select" ? (
                                    <select
                                        name={item.fId}
                                        className="w-full rounded-md border border-gray-300 p-2"
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
                                    />
                                )}
                            </Field>
                        ))}
                    </div>

                    <div className="mt-5">
                        <Button className="w-full" type="submit">
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}