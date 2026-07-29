import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogHeader, AlertDialogDescription, AlertDialogCancel, AlertDialogAction, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { CheckCircle2Icon } from "lucide-react";

import { JobQueue } from "@/app/types/jobqueue";
import { useState } from "react";

export default function Completed({ complete }: { complete: JobQueue }) {
    const [open, setOpen] = useState(false);
    const handleEdit = async () => {
        try {
            const done = await fetch("/api/jobqueue", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: complete.jobs_id,
                    status: "Completed",
                }),
            });
            console.log(done);
            if (done.ok) {
                await fetch("/api/history", {
                    cache: "no-store",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        history_id: complete.jobs_id,
                        finishDate: new Date().toDateString(),
                    }),
                });
            }
            window.location.reload();

        } catch (error) {
            console.error(error);
        }


    };
    
    return (


        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger
                className="hover:scale-105"
            >
                <CheckCircle2Icon onClick={() => setOpen(true)} />
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This action cannot be undone. This will remove the task from current view.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction
                        onClick={() => {
                            handleEdit();

                        }}

                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}