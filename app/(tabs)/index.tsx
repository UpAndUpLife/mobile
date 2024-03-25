import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

import { View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { Text, Button } from 'react-native-paper';
import { createWallet } from '@/api/login';
import { useToast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAtom } from 'jotai';
import { loginAtom, userWalletAtom } from '@/state/GlobalState';
import { GetMyInfoResponse, TrinsicService } from '@trinsic/trinsic';

// Do not remove it, used for text encoding by internal trinsic package
const TextEncodingPolyfill = require('text-encoding');
const BigInt = require('big-integer')

Object.assign(global, {
    TextEncoder: TextEncodingPolyfill.TextEncoder,
    TextDecoder: TextEncodingPolyfill.TextDecoder,
    BigInt: BigInt,
});

export default function Home() {
  
  let [login,setLogin] = useAtom(loginAtom);
  let [wallet, setWallet] = useAtom(userWalletAtom);
  const [info,setInfo] = useState<GetMyInfoResponse | null>(null);
  let toast = useToast();


  // Store state of trinsic create API wallet client session
  const getWallet = async ()=>{

    let authToken = await AsyncStorage.getItem('authToken');
    console.log(authToken)
    if (authToken === null) {
      toast.show("Invalid login token", {type: "danger"});
      return
    }

    try {
      let client = new TrinsicService({authToken: authToken});
      setWallet(client)
      let info = await client.wallet().getMyInfo();
      setInfo(info)

    } catch (e:any) {

      console.log(e);
      toast.show("Invalid login token", {type: "danger"});
    }
  }


  useEffect(()=>{
    getWallet();
  },[])


  return (
    <View className="flex w-full h-full items-center"> 


      <View>
        
      </View>

      {/* <Text variant='displaySmall' className="m-10">Up & Up</Text>
      <Text variant='displaySmall' className="m-10">Name: {info?.wallet?.name}</Text>
      <Text variant='displaySmall' className="m-10">Email: {info?.wallet?.email}</Text>
      <Text variant='displaySmall' className="m-10">DID: {info?.wallet?.publicDid}</Text>
      <Text variant='displaySmall' className="m-10">Walled DID: {info?.wallet?.walletId}</Text> */}

    </View>
  );
}
