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

export default function AddTask() {
    const fields = [
        { fId: "activity", fLabel: "Task", fPlaceholders: "Enter activity" },
        { fId: "assignee", fLabel: "Assignee", fPlaceholders: "(e.g Luke)" },
        { fId: "status", fLabel: "Status", fPlaceholders: "Enter activity" },
    ];

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
        if (!response.ok){
            throw new Error("Failed to create job");
        }
        return response.json();
    }
    return (
        <Dialog>
            <DialogTrigger render={<Button className={"mb-1 w-full"} />}>
                Add Task
            </DialogTrigger>

            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {fields.map((item) => (
                            <Field key={item.fId}>
                                <Label >{item.fLabel}</Label>
                                <Input placeholder={item.fPlaceholders} name={item.fId} />
                            </Field>
                        ))}
                    </div>
                    <div className="mt-5">
                        <Button className={"w-full"} type="submit">Save</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}