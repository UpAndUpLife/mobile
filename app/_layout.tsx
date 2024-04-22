import { checkLogin } from "@/api/login";
import { loginAtom } from "@/state/GlobalState";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { Stack, router } from "expo-router";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { ToastProvider } from "react-native-toast-notifications";


const RootLayout = () => {
  const [login, setLogin] = useAtom(loginAtom);

  const checkLoggedin = async ()=>{

    let authToken = await AsyncStorage.getItem("authToken");

    if (authToken !== null){
      let isloggedin = await checkLogin(authToken);
      setLogin(isloggedin);
      if (isloggedin === true){
        router.push("/(tabs)")
      }

      return
    }
    
    setLogin(false);
    router.push("/auth");
  }

  useEffect(()=>{
    checkLoggedin()
  },[])

  
  return (

    <PaperProvider>
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
                <Stack.Screen name="auth/index" options={{ headerShown: false}} />
                <Stack.Screen name="auth/signup" options={{ headerShown: true, headerTitle: ""}} />
                <Stack.Screen name="auth/login" options={{ headerShown: true, headerTitle: ""}} />
              </Stack>
            )
          }

    </ToastProvider>
    </PaperProvider>

  )
}


export default RootLayout;