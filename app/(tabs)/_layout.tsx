import { loginAtom } from "@/state/LoginState";
import { Stack, router } from "expo-router";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { ToastProvider } from "react-native-toast-notifications";


const RootLayout = () => {

  const [login, setLogin] = useAtom(loginAtom);

  useEffect(()=>{
    if (login === true) {
        router.push("/auth/signup");
    }

    else{ 
        router.push("/(tabs)/home")
    }
  })

  return (

    <Stack>
        <Stack.Screen name="home" options={{ headerShown: false}} />
    </Stack>

  
  )
}


export default RootLayout;