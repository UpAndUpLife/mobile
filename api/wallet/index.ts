import { Offer } from "@/utils/Interfaces";
import { RequestedProofs } from "@reclaimprotocol/reactnative-sdk";

const IP = "http://192.168.0.7:3001/api"

export async function generateSignature(APP_SECRET: string, proofs: RequestedProofs): Promise<[string, string, string]> {


    try {

        let res = await fetch(`${IP}/wallet/generate-signature`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                APP_SECRET: APP_SECRET,
                proofs: JSON.stringify(proofs)
            })
        })

        let data = await res.json();
        return [data.statusUrl, data.requestUrl, "success"];

    } catch (e: any) {
        console.log(e, "error")
        return ["Something we", "danger", ""];
    }
}

export async function getOffers(APP_SECRET: string): Promise<[Offer[] | null,string, string]> {


    try {

        let res = await fetch(`${IP}/wallet/get-offers`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': APP_SECRET
            }
        })

        let data: {code: number, data: Offer[]} = await res.json();

        if (data.code === 0) {
            return [data.data, "Offers fetched", "success"];
        }
        return [null,"Coudn't fetch the offers" ,"danger"];

    } catch (e: any) {
        console.log(e, "error")
        return [null,"Something went wrong" ,"danger"];
    }



}


export async function acceptCredential(authToken: String,credId: number): Promise<[string, string]> {


    try {

        let res = await fetch(`${IP}/wallet/accept-credential`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken,
            },
            body: JSON.stringify({
                credId
            })
        })

        let data = await res.json();
        
        if (data.code === 0) {
            return ["Credential Accepted", "success"];
        }
        else {
            return ["Something went wrong", "danger"]
        }

    } catch (e: any) {
        console.log(e, "error")
        return ["Something went wrong", "danger"];
    }
}
