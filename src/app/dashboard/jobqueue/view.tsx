import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { EyeIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

import { JobQueue } from "@/app/types/jobqueue";

interface ViewProps {
   data: JobQueue
}
export default function View({ data }: ViewProps) {

    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [open, setOpen] = useState(false);

    const handleView = (row: any) => {
        setSelectedRow(row.original);
        setOpen(true);
    };

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
        { fId: "remarks", fLabel: "Remarks", fPlaceholders: "Enter remarks", fType: "input" },
    ];
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className={"hover:scale-110"}>
                <EyeIcon />
            </DialogTrigger>

            <DialogContent>
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
                                        className={item.fId === "remarks" ? "w-full h-20 sm:col-span-2" : "w-full"}
                                    />
                                )}
                            </Field>
                        ))}
                    </div>
                    {/* <div className="mt-5">
                        <Button className={"w-full"} type="submit">Save</Button>
                    </div> */}
            </DialogContent>
        </Dialog> 
    )
}