import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Field, FieldLabel } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { EyeIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

import { Inventory } from "@/app/types/inventory";
import { inventoryTable } from "@/db/schema";

interface ViewProps {
    data: Inventory
}
export default function View({ data }: ViewProps) {

    const [open, setOpen] = useState(false);
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
        // {
        //     fId: "status", fLabel: "Status", fPlaceholders: "Enter activity", fOptions: [
        //         { label: "Pending", value: "Pending" },
        //         { label: "In Progress", value: "In Progress" },
        //         { label: "Completed", value: "Completed" },
        //     ], fType: "select"
        // },
    ];
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className={"hover:scale-110"}>
                <EyeIcon />
            </DialogTrigger>

            <DialogContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {fields.map((test) => (
                        <div key={test.fId}> 
                            <FieldLabel>
                                {test.fLabel}
                            </FieldLabel>
                            <Input
                                defaultValue={test.fval}
                            />
                        </ div>
                    ))}
                        </div>
                {/* <div className="mt-5">
                        <Button className={"w-full"} type="submit">Save</Button>
                    </div> */}
            </DialogContent>
        </Dialog>
    )
}