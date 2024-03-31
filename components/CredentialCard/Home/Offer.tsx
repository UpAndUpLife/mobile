import { FlashList } from "@shopify/flash-list";
import { Pressable, View } from "react-native";
import CredentialCard from "./CredentialCard";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { offersAtom, userWalletAtom } from "@/state/GlobalState";
import { acceptCredential, getOffers } from "@/api/wallet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";
import { Avatar, Button, Icon, MD3Colors, Modal, Text } from "react-native-paper";
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { ModalPendingCredential } from "@/utils/Interfaces";
import { FlatList } from "react-native-gesture-handler";
import { AcceptCredentialRequest, RejectCredentialRequest } from "@trinsic/trinsic";

export default function OffersList() {

  let [offers, setOffers] = useAtom(offersAtom);
  let [modalPendingCredData, setModalPendingCredData] = useState<ModalPendingCredential | null>(null)
  const [modalPendingCredJson, setModalPendingCredJson] = useState<any>(null);
  const [refresh,setRefresh] = useState(0);

  let toast = useToast();

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const getOffersCallback = async () => {
    let authToken = await AsyncStorage.getItem("authToken");

    if (authToken !== null) {
      let [offers, msg, code] = await getOffers(authToken);

      if (code === "success" && offers !== null) {
        setOffers(offers);
        return
      }
      else {
        toast.show(msg, { type: code });
      }

    }
  }

  const onAcceptCred = async () => {
    try{

      let authToken = await AsyncStorage.getItem("authToken");

      if (authToken === null) {
        toast.show("Auth Failed", {type:"danger"})
        return 
      }

      let [msg,code] = await acceptCredential(authToken,modalPendingCredData?.modelID!);
      toast.show(msg,{type: code})

      setRefresh(refresh+1);
      hideModal();

    } catch (err) {
      console.log(err)
    }
  }

  const onRejectCred = async () => {

    console.log("")

  }


  useEffect(() => {

    getOffersCallback()

  }, [refresh])

  return (
    <View style={{ flex: 1, width: "100%", height: "h-full", display: "flex", justifyContent: "center" }} >
      <FlashList
        centerContent
        data={offers}
        renderItem={({ item }) => <Pressable><CredentialCard offer={item} showModal={showModal} setModalPendingCredData={setModalPendingCredData} setModalPendingCredJson={setModalPendingCredJson} /></Pressable>}
        estimatedItemSize={200}
      />

      {
        modalPendingCredData !== null &&
        <Modal visible={visible} onDismiss={hideModal} style={{ width: "screen", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <View className="w-[90vw] h-[70vh] p-5 rounded-lg bg-[#f6f6f6]">
            <Text className="text-xl font-bold text-yellow-500">PENDING CREDENTIAL</Text>

            <View className="w-full h-[35%] flex items-center justify-center mt-10">

              <View className="w-[90%] h-full border-[1px] border-gray-400 rounded-lg bg-white flex items-center justify-between">

                <View className="w-[95%] h-[45%] border-b-[1px] border-gray-300 flex flex-row justify-between pt-3 items-center">

                  <Avatar.Text size={45} label="SI" className="ml-3" />

                  <View className="w-[75%] h-full">
                    <Text className="text-lg font-bold">{modalPendingCredData.credName}</Text>
                    <Text className="text-[11px]">Issued on {modalPendingCredData.issuedOn.slice(0, 10)}</Text>
                    <Text className="text-[11px]">{modalPendingCredData.id.slice(0, 30)}...</Text>
                  </View>

                </View>

                <View className="w-full h-[35%] p-3 flex flex-row pt-3 items-center " >
                  <Fontisto name="date" size={15} color="gray" />
                  <View className="w-[75%] ml-3">
                    <Text className="text-md font-semibold">Issued By</Text>
                    <Text className="text-[11px]">{modalPendingCredData.issuer.slice(0, 35)}....</Text>
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


              <FlatList
                className="h-[150px]"
                keyExtractor={item => {
                  return item[0]
                }}
                data={modalPendingCredData.fields}
                renderItem={({ item }: any) => (
                  <View className="flex flex-row mt-4 w-full justify-between px-1">
                    <Text>{item[0]}</Text>
                    <Text className="font-bold">{item[1]}</Text>
                  </View>
                )}
              />


            </View>

            <View className="flex flex-row justify-around mt-10">
              <Button mode="contained" theme={{ colors: { primary: "red" } }} onPress={onRejectCred}>
                Reject
              </Button>
              <Button mode="contained" theme={{ colors: { primary: "green" } }} onPress={onAcceptCred}>
                Accept
              </Button>
            </View>

          </View>

        </Modal>

      }
    </View>
  );
}