import { Offer } from "@/utils/Interfaces";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Avatar, Modal } from "react-native-paper";

interface CredentialCardProps {
    offer: Offer,
    showModal: () => void
}

const CredentialCard: React.FC<CredentialCardProps> = ({ offer,showModal }) => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [jsonDoc, setJsonDoc] = useState<any>(null);


    useEffect(() => {
        if (offer !== undefined && offer !== null) {
            setJsonDoc(JSON.parse(offer.documentJson));
            setIsLoaded(true);
        }
    }, [offer])

    return (

        <>
            {
                isLoaded && (
                    <>
                        <Pressable onPress={showModal}>
                            <View className="w-full flex justify-center items-center my-2">
                                <View className="w-[95%] h-[200px] bg-red-500 rounded-lg flex justify-between">

                                    <View className="w-full h-10 mt-5 flex justify-center items-end" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                                        <Text className="text-md font-bold text-gray-200 mr-5 opacity-100">Issued 02/20/2020</Text>
                                    </View>

                                    <View className="h-1/2 flex flex-row items-center">
                                        <Avatar.Text size={55} label="L" className="ml-5 bg-gray-500" />

                                        <View className="ml-4">
                                            <Text className="text-2xl text-gray-200">Proof of {jsonDoc.verifiableCredential[0].type[1]}</Text>
                                            <Text className="text-md text-gray-200">Issued by {offer.from.email}</Text>
                                            <Text className="text-sm text-gray-200">Network: Sovrin</Text>
                                        </View>
                                    </View>

                                </View>
                            </View>
                        </Pressable>
                    </>
                )
            }
        </>
    );
}

export default CredentialCard;