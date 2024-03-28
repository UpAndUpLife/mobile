import { FlashList } from "@shopify/flash-list";
import { Pressable, View } from "react-native";
import CredentialCard from "./CredentialCard";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { offersAtom } from "@/state/GlobalState";
import { getOffers } from "@/api/wallet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";
import { Modal } from "react-native-paper";


export default function OffersList() {

  let [offers, setOffers] = useAtom(offersAtom);
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


  useEffect(() => {

    getOffersCallback()

  }, [])

  return (
    <View style={{ flex: 1, width: "100%", height: "h-full", display: "flex", justifyContent: "center" }} >
      <FlashList
        centerContent
        data={offers}
        renderItem={({ item }) => <Pressable><CredentialCard offer={item} showModal={showModal} /></Pressable>}
        estimatedItemSize={200}
      />

      <Modal visible={visible} onDismiss={hideModal} style={{ position: "absolute", width: "screen", height: "100%", display: "flex", justifyContent:"center", alignItems:"center" }}>
        <View className="w-screen h-[500px] bg-red-500">

        </View>
      </Modal>
    </View>
  );
}