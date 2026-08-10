import { User } from "../types/user";

export async function getUser(): Promise<User[]> {
    const response = await fetch('http://it-helpdesk-app-xi.vercel.app/api/user');
    if (!response.ok) {
        throw new Error(`Failed to fetch job queue: ${response.status}`);
    }
    return (await response.json()) as User[];
}