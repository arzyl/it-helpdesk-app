import { Inventory } from "../types/inventory";

export async function getInventory(): Promise<Inventory[]> {
    const response = await fetch('http://it-helpdesk-app-xi.vercel.app/api/inventory');
    if (!response.ok) {
        throw new Error(`Failed to fetch inventory: ${response.status}`);
    }
    return (await response.json()) as Inventory[];
}