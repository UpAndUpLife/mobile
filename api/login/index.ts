import { useToast } from "react-native-toast-notifications";



export async function createWallet(name: string,email: string): Promise<[string,string]> {


    try {

        let res = await fetch("http://192.168.1.41:3001/create-wallet", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email
            })
        })

        let data = await res.json();
        return [data.msg, "success"];

    } catch (e: any) {
        console.log(e,"error")
        return ["Something we", "danger"];
    }   



}


export async function sendOTP(email: string): Promise<[string,string]> {


    try {

        let res = await fetch("http://192.168.1.41:3001/send-otp", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        })

        let data = await res.json();
        return [data.challenge, data.status];

    } catch (e: any) {
        console.log(e,"error")
        return ["Something we", "danger"];
    }
}
