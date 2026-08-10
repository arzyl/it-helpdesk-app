import { AppSidebar } from "@/components/ui/app-sidebar"
import { redirect } from "next/navigation"

export default function DashBoard() {
    redirect("/dashboard/jobqueue")
}