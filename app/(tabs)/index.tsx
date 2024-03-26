import { Dimensions, Pressable, View, useWindowDimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { Text, Button, Portal, Modal, Appbar, Icon } from 'react-native-paper';
import { createWallet } from '@/api/login';
import { useToast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAtom } from 'jotai';
import { loginAtom, userWalletAtom } from '@/state/GlobalState';
import { GetMyInfoResponse, TrinsicService } from '@trinsic/trinsic';
import { TabView, SceneMap, TabBar} from 'react-native-tab-view';
import CredentialsList from '@/components/CredentialCard/Home/Credentials';
import OffersList from '@/components/CredentialCard/Home/Offer';

// Do not remove it, used for text encoding by internal trinsic package
const TextEncodingPolyfill = require('text-encoding');
const BigInt = require('big-integer')

Object.assign(global, {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
  BigInt: BigInt,
});

const renderScene = SceneMap({
  credentials: CredentialsList,
  offers: OffersList,
});

const renderTabBar = props => (
  <TabBar
    {...props}
    
    renderLabel={({ route, focused, color }) => (
      <Text style={{ color: focused ? "#60a5fa" : "grey", margin: 8, fontWeight:"bold" }}>
        {route.title}
      </Text>
    )}
    indicatorStyle={{ backgroundColor: '#60a5fa' }}
    style={{ backgroundColor: 'white'}}
  />
);

export default function Home() {

  let [login, setLogin] = useAtom(loginAtom);
  let [wallet, setWallet] = useAtom(userWalletAtom);
  const [info, setInfo] = useState<GetMyInfoResponse | null>(null);
  let toast = useToast();



  // Store state of trinsic create API wallet client session
  const getWallet = async () => {

    let authToken = await AsyncStorage.getItem('authToken');
    console.log(authToken)
    if (authToken === null) {
      toast.show("Invalid login token", { type: "danger" });
      return
    }

    try {
      let client = new TrinsicService({ authToken: authToken });
      setWallet(client)
      let info = await client.wallet().getMyInfo();
      setInfo(info)

    } catch (e: any) {

      console.log(e);
      toast.show("Invalid login token", { type: "danger" });
    }
  }


  useEffect(() => {
    getWallet();
  }, [])


  const layout = useWindowDimensions();
  

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'credentials', title: 'Credentials' },
    { key: 'offers', title: 'Offers' },
  ]);

  return (
    <View className="flex w-full h-full items-center bg-white">


      <TabView
        style = {{width:"100%", height:"100%"}}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />

      {/* 
      <View className="w-full h-[100px] flex flex-row items-center p-2">
        <Pressable className="mx-3" onPress={() => setShowCreds(true)}>
          <Text className="text-lg font-bold" style={{ color: showCreds ? `#60a5fa` : "#3a3b3d", textDecorationLine: showCreds ? "underline" : "none" }}>Credentials</Text>
        </Pressable>
        <Pressable onPress={() => setShowCreds(false)}>
          <Text className="text-lg font-bold" style={{ color: showCreds ? `#3a3b3d` : "#60a5fa", textDecorationLine: showCreds ? "none" : "underline" }}>Offers</Text>
        </Pressable>
      </View> */}

    </View>
  );
}
