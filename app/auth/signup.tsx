import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

import { View } from '@/components/Themed';
import { useState } from 'react';
import { Text, Button } from 'react-native-paper';
import { createWallet } from '@/api/login';
import { useToast } from 'react-native-toast-notifications';
import { Link, router } from 'expo-router';

export default function Signup() {

  const [email,setEmail] = useState<string>("");
  const [name,setname] = useState<string>("");
  const toast = useToast();

  const onSubmit = async ()=>{
   let [msg,code] =  await createWallet(name,email);
   toast.show(msg,{
    type: code
   })

   if (code === "success"){
    router.push("/auth/login")
   }
  }
  
  return (
    <View className="flex w-full h-full items-center"> 

      <Text variant='displaySmall' className="m-10">Create Account</Text>
      <TextInput className="w-[80%] m-2" label="name" value={name} onChangeText={setname}/>
      <TextInput className="w-[80%] m-2" label="email" value={email} onChangeText={setEmail} inputMode='email'/>

        <Link href={"/auth/login"}>or Login</Link>

      <Button onPressOut={onSubmit} className="mt-10" icon="wallet" mode="contained" onPress={()=> createWallet(name,email)}>
        Create Wallet
      </Button>
    
    </View>
  );
}
