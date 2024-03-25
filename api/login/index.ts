const IP = "http://192.168.0.7:3001/api"

export async function createWallet(name: string,email: string): Promise<[string,string]> {


    try {

        let res = await fetch(`${IP}/auth/create-wallet`, {
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

        let res = await fetch(`${IP}/auth/send-otp`, {
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

        let res = await fetch(`${IP}/auth/get-auth-token`, {
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




export async function checkLogin(authToken: String): Promise<boolean> {


    try {

        let res = await fetch(`${IP}/auth/check-login`, {
            method: "GET",
            headers: {
                'Authorization': authToken,
                'Content-Type': 'application/json'
            }
        })

        let data = await res.json();
        if (data.code === 0) {
            return true
        }

       return false

    } catch (e: any) {
        console.log(e,"error")
        return false
    }
}


export async function getUserInfo(authToken: String): Promise<boolean> {


    try {

        let res = await fetch(`${IP}/auth/check-login`, {
            method: "GET",
            headers: {
                'Authorization': authToken,
                'Content-Type': 'application/json'
            }
        })

        let data = await res.json();
        if (data.code === 0) {
            return true
        }

       return false

    } catch (e: any) {
        console.log(e,"error")
        return false
    }
}
