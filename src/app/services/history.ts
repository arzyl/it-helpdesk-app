import { History } from "../types/history";

export async function getHistory(): Promise<History[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/history`);
    if (!response.ok) {
        throw new Error(`Failed to fetch history: ${response.status}`);
    }
    return (await response.json()) as History[];
}