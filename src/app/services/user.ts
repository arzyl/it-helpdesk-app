import { User } from "../types/user";

export async function getUser(): Promise<User[]> {
    const response = await fetch('http://localhost:3000/api/user');
    if (!response.ok) {
        throw new Error(`Failed to fetch job queue: ${response.status}`);
    }
    return (await response.json()) as User[];
}