"use client"

import { Dialog, DialogHeader, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { EyeIcon, SquarePen } from "lucide-react"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { JobQueue } from "@/app/types/jobqueue";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Inventory } from "@/app/types/inventory";

type EditProps = {
    data: Inventory
}

export default function EditTask({ data }: EditProps) {
    const fields = [
        { fId: "hostname", fLabel: "Hostname", fPlaceholders: "Enter hostname", fType: "input", fval: data.inventory.hostname },
        { fId: "motherboard", fLabel: "Motherboard", fPlaceholders: "Enter motherboard)", fType: "input", fval: data.inventory.motherboard },
        { fId: "processor", fLabel: "Processor", fPlaceholders: "Enter processor", fType: "input", fval: data.inventory.processor },
        { fId: "memory", fLabel: "Memory", fPlaceholders: "Enter memory", fType: "input", fval: data.inventory.memory },
        { fId: "storage", fLabel: "Storage", fPlaceholders: "Enter storage", fType: "input", fval: data.inventory.storage },
        { fId: "monitor", fLabel: "Monitor", fPlaceholders: "Enter monitor", fType: "input", fval: data.inventory.monitor },
        { fId: "mouse", fLabel: "Mouse", fPlaceholders: "Enter brand", fType: "input", fval: data.inventory.mouse },
        { fId: "keyboard", fLabel: "Keyboard", fPlaceholders: "Enter brand", fType: "input", fval: data.inventory.keyboard },
        { fId: "avr", fLabel: "AVR", fPlaceholders: "Enter brand", fType: "input", fval: data.inventory.avr },
        { fId: "os", fLabel: "Operating System", fPlaceholders: "Enter OS", fType: "input", fval: data.inventory.os },
        { fId: "oslicense", fLabel: "OS License", fPlaceholders: "Enter OS License", fType: "input", fval: data.inventory.oslicense },
        { fId: "msoffice", fLabel: "MS Office", fPlaceholders: "Enter MS Office ", fType: "input", fval: data.inventory.msoffice },
        { fId: "mslicense", fLabel: "MS License", fPlaceholders: "Enter MS License", fType: "input", fval: data.inventory.mslicense },
        { fId: "remarks", fLabel: "Remarks", fPlaceholders: "Rremarks", fType: "input", fval: data.inventory.remarks },
        { fId: "location", fLabel: "Location", fPlaceholders: "Location", fType: "input", fval: data.inventory.location },
    ];
    // Create handleEdit -------------**
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const [disable, setDisable] = useState(true);
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const payload = {
            inv_id: data.inventory.inv_id,
            hostname: formData.get("hostname"),
            motherboard: formData.get("motherboard"),
            processor: formData.get("processor"),
            memory: formData.get("memory"),
            storage: formData.get("storage"),
            monitor: formData.get("monitor"),
            mouse: formData.get("mouse"),
            keyboard: formData.get("keyboard"),
            avr: formData.get("avr"),
            os: formData.get("os"),
            oslicense: formData.get("oslicense"),
            msoffice: formData.get("msoffice"),
            mslicense: formData.get("mslicense"),
            remarks: formData.get("remarks"),
            location: formData.get("location")
        }

        const response = await fetch(`/api/inventory/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),

        })
        console.log("Updated successfully")
        setOpen(false)
        router.refresh()
        setDisable(true)
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen)
            if (!isOpen) {
                setDisable(true)
            }
        }}>

 
            <DialogTrigger className={"hover:scale-110"}>
                <EyeIcon />
                
            </DialogTrigger>

            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {fields.map((test) => (
                            <div key={test.fId}>
                                <FieldLabel>
                                    {test.fLabel}
                                </FieldLabel>
                                <Input
                                    disabled={disable}
                                    name={test.fId}
                                    defaultValue={test.fval}
                                />
                            </ div>
                        ))}
                    </div>
                    <div className="mt-5">
                        {disable ? (
                            <SquarePen
                                className="cursor-pointer hover:scale-110 w-full"
                                onClick={() => setDisable(false)}
                            />
                        ) : (
                            <Button className={"w-full"} type="submit">Save</Button>
                        )}
                    </div>

                </form>
            </DialogContent>
        </Dialog>
    )
}