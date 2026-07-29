export interface Inventory {

    inventory: {

        inv_id: number,
        hostname: string,
        motherboard: string,
        processor: string,
        memory: string,
        storage: string,
        monitor: string,
        mouse: string,
        keyboard: string,
        avr: string,
        os: string,
        oslicense: string,
        msoffice: string,
        mslicense: string,
        remarks: string,
        kaspersky: string,
        location: string
    },

    userinvTable: {
        user_id: number,
        username: string,
        department: string,
        position: string
    }
}