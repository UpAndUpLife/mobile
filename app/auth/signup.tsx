import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

import { View } from 'react-native';
import { useState } from 'react';
import { Text, Button } from 'react-native-paper';
import { createWallet } from '@/api/login';
import { useToast } from 'react-native-toast-notifications';
import { Link, router } from 'expo-router';
import LottieView from 'lottie-react-native';

export default function Signup() {

  const [email,setEmail] = useState<string>("");
  const [name,setname] = useState<string>("");
  const toast = useToast();

  const onCreateWallet = async ()=>{
   let [msg,code] =  await createWallet(name,email);
   toast.show(msg,{
    type: code
   })

   if (code === "success"){
    router.push("/auth/login")
   }
  }
  
  return (
    <View className="flex w-full h-full items-center bg-white"> 

      <View className="w-full h-[55%] items-center justify-center" >
        <LottieView source={require("../../assets/vectors/signupScreen.json")} className="w-[80%] h-[80%]" autoPlay loop={false}/>
      </View>

      <View className="flex w-full items-center">

        <Text className="m-3 text-2xl font-bold text-gray-700">Let's Get Started!</Text>
        <TextInput className="w-[90%] m-2" label="Name" value={name} onChangeText={setname} mode='outlined' theme={{colors: {primary: "#60a5fa"}}} />
        <TextInput className="w-[90%] m-2" label="Email" value={email} onChangeText={setEmail} mode='outlined' inputMode='email' theme={{colors: {primary: "#60a5fa"}}}/>


        <Button className="mt-5 w-[90%] rounded-lg" icon="wallet" mode="contained" onPress={()=> onCreateWallet()} theme={{colors: {primary: "#60a5fa"}}}>
          Create Wallet
        </Button>
      </View>

    
    </View>
  );
}
