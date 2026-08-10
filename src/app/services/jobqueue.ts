import { JobQueue } from "../types/jobqueue";

export async function getJob(): Promise<JobQueue[]> {
    const response = await fetch('http://it-helpdesk-app-xi.vercel.app/api/jobqueue');
    if (!response.ok) {
        throw new Error(`Failed to fetch job queue: ${response.status}`);
    }
    return (await response.json()) as JobQueue[];
}