import { RequestedProofs } from "@reclaimprotocol/reactnative-sdk";

const IP = "http://192.168.0.7:3001/api"

export async function generateSignature(APP_SECRET: string,proofs: RequestedProofs): Promise<[string,string,string]> {


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
        console.log(e,"error")
        return ["Something we", "danger",""];
    }   



}
