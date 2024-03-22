import { useToast } from "react-native-toast-notifications";

const IP = "http://192.168.1.41:3001"

export async function createWallet(name: string,email: string): Promise<[string,string]> {


    try {

        let res = await fetch(`${IP}/create-wallet`, {
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


export async function sendOTP(email: string): Promise<[string | null, string,string]> {


    try {

        let res = await fetch(`${IP}/send-otp`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        })

        let data = await res.json();

        if (data.code === 0) {
            return [data.challenge, "OTP Sent!", "success"]
        }
        
        else if (data.code === 5) {
            return [null,"Account does not exists, Please login", "warning"]
        }

        return [null,"Something went wrong", "danger"];

    } catch (e: any) {
        console.log(e,"error")
        return [null,"Something went wrong", "danger"];
    }
}


export async function getAuthToken(challange: string, otp: string): Promise<[string | null, string,string]> {


    try {

        let res = await fetch(`${IP}/get-auth-token`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "challenge": challange,
                "otp": otp
            })
        })

        let data = await res.json();

        if (data.code === 0) {
            return [data.authToken,"Logged in", "success"]
        }

        else if (data.code === 3) {
            return [null,"Invalid Challange submitted", "warning"]
        }

        return [null,"Something went wrong", "danger"];

    } catch (e: any) {
        console.log(e,"error")
        return [null,"Something went wrong", "danger"];
    }
}
