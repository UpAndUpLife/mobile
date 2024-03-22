import { loginAtom } from "@/state/LoginState";
import { Stack, router } from "expo-router";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { ToastProvider } from "react-native-toast-notifications";


const RootLayout = () => {

  const [login, setLogin] = useAtom(loginAtom);

  useEffect(()=>{
    if (login === false) {
        router.push("/auth/signup");
    }

    else{ 
        router.push("/(tabs)/home")
    }
  })

  return (

    <ToastProvider>
          {
            login ? 
            (
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack>
            )
            : 
            (
              <Stack>
                <Stack.Screen name="auth/signup" options={{ headerShown: false}} />
                <Stack.Screen name="auth/login" options={{ headerShown: false}} />
              </Stack>

            )
          }
    </ToastProvider>
  
  )
}


export default RootLayout;