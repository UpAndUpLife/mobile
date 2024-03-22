import { TextInput } from 'react-native-paper';

import { View } from '@/components/Themed';
import { useState } from 'react';
import { Text, Button } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
import { getAuthToken, sendOTP } from '@/api/login';
import { useAtom } from 'jotai';
import { loginAtom } from '@/state/LoginState';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage1() {

  const [loggedin, setLoggedIn] = useAtom(loginAtom);
  const [email,setEmail] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [challange, setChallange] = useState<string>("");
  const toast = useToast();


  const sendotp = async () => {
    let [challange_resp,msg,code] = await sendOTP(email);

    if (challange_resp !== null){
      setChallange(challange_resp);
      setOtpSent(true);

    }

    toast.show(msg, {type: code});
  }

  const onSubmit = async () => {
    let [authToken, msg, code] = await getAuthToken(challange,otp)
    
    if (authToken !== null) {
      setLoggedIn(true);
      AsyncStorage.setItem('authToken',authToken)
    }

    toast.show(msg, {type: code});
  }

  
  return (
    <View className="flex w-full h-full items-center"> 

      <Text variant='displaySmall' className="m-10">Login</Text>
      <TextInput className="w-[80%] m-2" label="email" value={email} onChangeText={setEmail} inputMode='email' placeholder='jhon@xyz.com'/>

      {
        otpSent && <TextInput className="w-[80%] m-2" label="OTP" value={otp} onChangeText={setOtp} inputMode='text'/>
      }

      {
        otpSent ?
        <Button className="mt-10" icon="wallet" mode="contained" onPress={onSubmit}>
          Login
        </Button>

        : 
        <Button className="mt-10" icon="wallet" mode="contained" onPress={()=>sendotp()}>
          Get OTP
        </Button>
      }

    
    </View>
  );
}