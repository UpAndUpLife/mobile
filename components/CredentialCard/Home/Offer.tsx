import { FlashList } from "@shopify/flash-list";
import { Pressable, View } from "react-native";
import CredentialCard from "./CredentialCard";


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

export default function OffersList() {


    return(
        <View style={{ flex: 1, width: "100%", height: "h-full" }} >
            <FlashList
              centerContent
              data={DATA}
              renderItem={({ item }) => <Pressable><CredentialCard /></Pressable>}
              estimatedItemSize={200}
            />
        </View>
    );
}