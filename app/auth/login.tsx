import { TextInput } from 'react-native-paper';

import { View } from '@/components/Themed';
import { useState } from 'react';
import { Text, Button } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';

export default function LoginPage1() {

  const [email,setEmail] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const toast = useToast();


  const sendOTP = () => {
    toast.show("OTP Sent!", {type: "success"});
    setOtpSent(true);
  }

  const onSubmit = () => {

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
        <Button onPressOut={onSubmit} className="mt-10" icon="wallet" mode="contained" onPress={onSubmit}>
          Login
        </Button>

        : 
        <Button onPressOut={onSubmit} className="mt-10" icon="wallet" mode="contained" onPress={sendOTP}>
          Get OTP
        </Button>
      }

    
    </View>
  );
}
