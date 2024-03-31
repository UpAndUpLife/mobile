import { FlashList } from "@shopify/flash-list";
import { Linking, Pressable, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { useState } from "react";
import { useAtom } from "jotai";
import { userWalletAtom } from "@/state/GlobalState";
import { startVerificationFlow } from "@/utils/aadharZKP";

export default function CredentialsList() {

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [wallet] = useAtom(userWalletAtom);
  const [verificationReq, setVerificationReq] = useState<any>(null);
  const [extracted, setExtracted] = useState<any>(null);



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

      {/* <FlashList
        centerContent
        data={DATA}
        renderItem={({ item }) => <Pressable><CredentialCard /></Pressable>}
        estimatedItemSize={200}
      /> */}

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