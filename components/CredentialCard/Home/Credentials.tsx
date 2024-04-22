import { FlashList } from "@shopify/flash-list";
import { Linking, Pressable, View } from "react-native";
import { Avatar, Button, IconButton, Modal, Searchbar, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { credsAtom, userWalletAtom } from "@/state/GlobalState";
import { startVerificationFlow } from "@/utils/aadharZKP";
import { useToast } from "react-native-toast-notifications";
import CredentialCard from "./CredentialCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCreds } from "@/api/wallet";
import { Feather, Fontisto } from "@expo/vector-icons";
import { Reclaim } from "@reclaimprotocol/reactnative-sdk";

export default function CredentialsList() {

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [refresh, setRefresh] = useState(0);
  const [proof, setProof] = useState<any>();


  const [wallet] = useAtom(userWalletAtom);
  let [creds, setCreds] = useAtom(credsAtom);

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  let toast = useToast();


  const getCredsCallback = async () => {
    let authToken = await AsyncStorage.getItem("authToken");

    if (authToken !== null) {
      let [credentials, msg, code] = await getCreds(authToken);

      if (code === "success" && credentials !== null) {
        setCreds(credentials);
        return
      }
      else {
        toast.show(msg, { type: code });
      }

    }
  }


  const verifyProof = async () => {

    let result = await Reclaim.verifySignedProof(proof);

    if (result === true) {
      toast.show("Document is valid", {type:"success"})
    }

    else {
      toast.show("Document is Invalid", {type:"danger"})
    }

  }

  useEffect(() => {

    getCredsCallback()

  }, [refresh])

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
        data={creds}
        renderItem={({ item }) => <Pressable><CredentialCard credential={item} showModal={showModal} setProofDoc={setProof} /></Pressable>}
        estimatedItemSize={200}
      />

      <Modal visible={visible} onDismiss={hideModal} style={{ width: "screen", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <View className="w-[90vw] h-[70vh] p-5 rounded-lg bg-[#f6f6f6]">
          <Text className="text-xl font-bold text-red-500">CREDENTIAL</Text>

          <View className="w-full h-[35%] flex items-center justify-center mt-10">

            <View className="w-[90%] h-full border-[1px] border-gray-400 rounded-lg bg-white flex items-center justify-between">

              <View className="w-[95%] h-[45%] border-b-[1px] border-gray-300 flex flex-row justify-between pt-3 items-center">

                <Avatar.Text size={45} label="SI" className="ml-3" />

                {/* <View className="w-[75%] h-full">
                  <Text className="text-lg font-bold">{modalPendingCredData.credName}</Text>
                  <Text className="text-[11px]">Issued on {modalPendingCredData.issuedOn.slice(0, 10)}</Text>
                  <Text className="text-[11px]">{modalPendingCredData.id.slice(0, 30)}...</Text>
                </View> */}

              </View>

              <View className="w-full h-[35%] p-3 flex flex-row pt-3 items-center " >
                <Fontisto name="date" size={15} color="gray" />
                <View className="w-[75%] ml-3">
                  <Text className="text-md font-semibold">Issued By</Text>
                  {/* <Text className="text-[11px]">{modalPendingCredData.issuer.slice(0, 35)}....</Text> */}
                </View>

              </View>

              <View className="w-full h-[25%] p-3 flex flex-row pt-3 items-start">
                <Feather name="user-check" size={15} color="#24a66e" />
                <View className="w-[75%] ml-3">
                  <Text className="text-[11px] text-[#24a66e]">Authorized User</Text>
                </View>

              </View>

            </View>

          </View>


          <View className="overflow-y-scroll w-[95%] pt-5">
            <Text className="text-sm font-bold text-gray-800">Your Credential</Text>


            {/* <FlatList
              className="h-[150px]"
              keyExtractor={item => {
                return item[0]
              }}
              data={}
              renderItem={({ item }: any) => (
                <View className="flex flex-row mt-4 w-full justify-between px-1">
                  <Text>{item[0]}</Text>
                  <Text className="font-bold">{item[1]}</Text>
                </View>
              )}
            /> */}


          </View>

          <View className="flex flex-row justify-around mt-10">
            <Button onPress={verifyProof} mode="contained" theme={{ colors: { primary: "green" } }} >
              Verify Credential
            </Button>
          </View>

        </View>

      </Modal>


      <IconButton
        style={{ backgroundColor: "#d2e5fc", position: "absolute", bottom: 0, right: 0, margin: 20 }}
        icon="plus"
        iconColor="#60a5fa"
        size={50}
        onPress={() => startVerificationFlow(wallet, toast)}
      />
    </View>
  );
}