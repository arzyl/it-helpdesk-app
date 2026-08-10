import { User } from "../types/user";

export async function getUser(): Promise<User[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`);
    if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.status}`);
    }
    return (await response.json()) as User[];
}