


export interface Offer {
    id: number,
    fromId: number,
    toId: number,
    documentJson: string,
    shareUrl: string,
    to: {
        id: number,
        walletId: string,
        name: string,
        email: string
    },
    from: {
        id: number,
        walletId: string,
        name: string,
        email: string
    }
}


export interface ModalPendingCredential {
    id: string,
    modelID: number,
    credName: string,
    issuedOn: String,
    issuer: string,
    
    fields: [string,string][]
}