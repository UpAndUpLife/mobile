import "@ethersproject/shims"

import { FlashList } from "@shopify/flash-list";
import { Linking, Pressable, View } from "react-native";
import CredentialCard from "./CredentialCard";
import { IconButton, Searchbar } from "react-native-paper";
import { useState } from "react";
import { useAtom } from "jotai";
import { userWalletAtom } from "@/state/GlobalState";
import { Proof, RequestedProofs, Reclaim } from '@reclaimprotocol/reactnative-sdk'
import { generateSignature } from "@/api/wallet";

const DATA = [
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  ,
  {
    title: "Second Item",
  },
  ,
  {
    title: "Second Item",
  },
  ,
  {
    title: "Second Item",
  },
  ,
  {
    title: "Second Item",
  },
  ,
  {
    title: "Second Item",
  },
  ,
  {
    title: "Second Item",
  },
  ,
  {
    title: "Second Item",
  },
];

export default function CredentialsList() {

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [wallet] = useAtom(userWalletAtom);
  const [verificationReq, setVerificationReq] = useState<any>(null);
  const [extracted, setExtracted] = useState<any>(null);


  // reclaim integration
  const APP_SECRET = "0xbd31ecacdff8a65ac296320b9ca993355e98c3d88c09c8424ef9f7ed575862d2"
  const APP_ID = '0xDD192dE4F4a577fA9529b9a0aF5F49b5940F2590'
  const reclaimClient = new Reclaim.ProofRequest(APP_ID)

  async function startVerificationFlow() {
    const providerId = '5e1302ca-a3dd-4ef8-bc25-24fcc97dc800' //TODO: replace with your provider id you had selected while creating the application

    const appDeepLink = 'exp://192.168.0.7:8081/--/' //TODO: replace with your app deep link
    reclaimClient.setAppCallbackUrl(appDeepLink)

    reclaimClient.addContext(
      (`user's address`),
      ('for acmecorp.com on 1st january')
    )

    await reclaimClient.buildProofRequest(providerId)

    try {

      let proofs = await reclaimClient.getRequestedProofs();

      let [requestUrl,statusUrl,s] = await generateSignature(APP_SECRET, proofs)
      Linking.openURL(statusUrl)

    } catch (e) {
      console.log(e)
    }

    await reclaimClient.startSession({
      onSuccessCallback: proof => {
        console.log('Verification success', proof)
        // Your business logic here
      },
      onFailureCallback: error => {
        console.error('Verification failed', error)
        // Your business logic here to handle the error
      }
    })
  }



  return (
    <View style={{ flex: 1, width: "100%", height: "h-full" }} >

      <View className="w-full flex items-center py-3">
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          className="w-[95%] rounded-lg bg-white border-blue-700 border-[1px]"
          theme={{ colors: { primary: "#60a5fa" } }}
          mode="bar"
        />
      </View>

      <FlashList
        centerContent
        data={DATA}
        renderItem={({ item }) => <Pressable><CredentialCard /></Pressable>}
        estimatedItemSize={200}
      />

      <IconButton
        style={{ backgroundColor: "#d2e5fc", position: "absolute", bottom: 0, right: 0, margin: 20 }}
        icon="plus"
        iconColor="#60a5fa"
        size={50}
        onPress={startVerificationFlow}
      />
    </View>
  );
}