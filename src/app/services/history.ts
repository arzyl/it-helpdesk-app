import { History } from "../types/history";

export async function getHistory(): Promise<History[]> {
    const response = await fetch('http://localhost:3000/api/history');
    if (!response.ok) {
        throw new Error(`Failed to fetch job queue: ${response.status}`);
    }
    return (await response.json()) as History[];
}