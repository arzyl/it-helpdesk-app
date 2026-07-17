import { Dialog, DialogHeader, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Field } from "@/components/ui/field"
import { SquarePen } from "lucide-react"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

export default function EditTask(){
    const fields = [
        { fId: "activity", fLabel: "Task", fPlaceholders: "Enter activity" },
        { fId: "assignee", fLabel: "Assignee", fPlaceholders: "(e.g Luke)" },
        { fId: "status", fLabel: "Status", fPlaceholders: "Enter activity" },
    ];
    // Create handleEdit -------------**

    return(
        <Dialog>
            <DialogTrigger>
                <SquarePen />
            </DialogTrigger>

            <DialogContent>
                <form >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {fields.map((item) => (
                            <Field key={item.fId}>
                                <Label >{item.fLabel}</Label>
                                <Input placeholder={item.fPlaceholders} name={item.fId} disabled={item.fId=="activity"}/>
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