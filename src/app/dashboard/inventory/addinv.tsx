'use client'

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter

 } from "next/navigation";
export default function AddInventory() {
    const fields = [
        { fId: "username", fLabel: "Username", fPlaceholders: "Enter username", fType: "input" },
        { fId: "department", fLabel: "Department", fPlaceholders: "Enter department", fType: "input" },
        { fId: "position", fLabel: "Position", fPlaceholders: "Enter position", fType: "input" },
        { fId: "hostname", fLabel: "Hostname", fPlaceholders: "Enter hostname", fType: "input" },
        { fId: "motherboard", fLabel: "Motherboard", fPlaceholders: "Enter motherboard", fType: "input" },
        { fId: "processor", fLabel: "Processor", fPlaceholders: "Enter processor", fType: "input" },
        { fId: "memory", fLabel: "Memory", fPlaceholders: "Enter memory", fType: "input" },
        { fId: "storage", fLabel: "Storage", fPlaceholders: "Enter storage", fType: "input" },
        { fId: "monitor", fLabel: "Monitor", fPlaceholders: "Enter monitor", fType: "input" },
        { fId: "mouse", fLabel: "Mouse", fPlaceholders: "Enter mouse", fType: "input" },
        { fId: "keyboard", fLabel: "Keyboard", fPlaceholders: "Enter keyboard", fType: "input" },
        { fId: "avr", fLabel: "AVR", fPlaceholders: "Enter avr", fType: "input" },
        { fId: "os", fLabel: "Operating System", fPlaceholders: "Enter os type", fType: "input" },
        { fId: "oslicense", fLabel: "OS License", fPlaceholders: "Enter OS License key", fType: "input" },
        { fId: "msoffice", fLabel: "MS Office", fPlaceholders: "Enter MS Office", fType: "input" },
        { fId: "mslicense", fLabel: "MS License", fPlaceholders: "Enter key", fType: "input" },
        { fId: "remarks", fLabel: "Remarks", fPlaceholders: "Enter remarks", fType: "input" },
        { fId: "kaspersky", fLabel: "Kaspersky", fPlaceholders: "Enter key", fType: "input" },
        { fId: "location", fLabel: "Location", fPlaceholders: "Enter location", fType: "input" },
    ]
    const [open,setOpen] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault();
        const body = {
            ...Object.fromEntries(new FormData(e.currentTarget))
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/inventory`, {
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {fields.map((item) => (
                            <Field key={item.fId}>
                                <Label>
                                    {item.fLabel}
                                </Label>
                                <Input
                                    placeholder={item.fPlaceholders}
                                    name={item.fId}
                                    className="rounded-none"
                                />
                            </Field>
                        ))}
                    </div>
                    <div className="mt-5">
                    <Button className="w-full" type="submit">Save</Button>
                </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}