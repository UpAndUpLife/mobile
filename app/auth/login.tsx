import { TextInput } from 'react-native-paper';

import { View } from 'react-native';
import { useState } from 'react';
import { Text, Button } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
import { getAuthToken, sendOTP } from '@/api/login';
import { useAtom } from 'jotai';
import { loginAtom } from '@/state/GlobalState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import { router } from 'expo-router';

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
      toast.show("Logged in", {type: "success"});
      router.navigate("/")
    }

    toast.show(msg, {type: code});
  }

  
  return (
    <View className="flex w-full h-full items-center bg-white"> 

      <View className="w-full h-[45%] items-center justify-center" >
        <LottieView source={require("../../assets/vectors/loginScreen.json")} className="w-[70%] h-[70%]" autoPlay loop={false}/>
      </View>


      <View className="flex w-full items-center">

      <Text className="m-3 text-2xl font-bold text-gray-700">Welcome Back!</Text>
        <TextInput className="w-[90%] m-2" label="email" value={email} onChangeText={setEmail} inputMode='email' placeholder='jhon@xyz.com' mode='outlined' theme={{colors: {primary: "#60a5fa"}}} />

        {
          otpSent && <TextInput className="w-[90%] m-2" label="OTP" value={otp} keyboardType="numeric" onChangeText={setOtp} inputMode='text' mode='outlined' theme={{colors: {primary: "#60a5fa"}}}/>
        }

        {
          otpSent ?
          <Button className="mt-5 w-[90%] rounded-lg" icon="login" mode="contained" onPress={onSubmit} theme={{colors: {primary: "#60a5fa"}}}> 
            LOGIN
          </Button>

          : 
          <Button onPress={()=>sendotp()} className="mt-5 w-[90%] rounded-lg" style={{}} icon="keyboard" mode="outlined" theme={{colors: {primary: "#60a5fa"}}}>
            GET OTP
          </Button>
        }

      </View>
    
    </View>
  );
}