import { Inventory } from "../types/inventory";

export async function getInventory(): Promise<Inventory[]> {
    const response = await fetch('http://localhost:3000/api/inventory');
    if (!response.ok) {
        throw new Error(`Failed to fetch job queue: ${response.status}`);
    }
    return (await response.json()) as Inventory[];
}