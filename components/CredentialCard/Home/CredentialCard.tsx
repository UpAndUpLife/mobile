import { Credential, ModalPendingCredential, Offer } from "@/utils/Interfaces";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Avatar, Modal } from "react-native-paper";
import { convertObjectToArray } from "@/utils/helpers";

interface CredentialCardProps {
    credential: Credential,
    showModal: () => void,
    setProofDoc: React.Dispatch<any>
}

const CredentialCard: React.FC<CredentialCardProps> = ({ credential, showModal, setProofDoc }) => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [jsonDoc, setJsonDoc] = useState<any>(null);
    const [proof, setProof] = useState<any>(null);
    const [context, setContext] = useState<any>(null);


    // const onModelShow = () => {

    //     // can be optimesed by checking if the same state is already loaded in the useState

    //     let modelData: ModalPendingCredential = {
    //         id: jsonDoc.verifiableCredential[0].id,
    //         modelID: credential.id,
    //         credName: jsonDoc.verifiableCredential[0].name,
    //         issuedOn: jsonDoc.verifiableCredential[0].credentialSubject.issuanceDate,
    //         issuer: jsonDoc.verifiableCredential[0].issuer,

    //         fields: convertObjectToArray(jsonDoc.verifiableCredential[0].credentialSubject.credentialSubject)
    //     }
    //     setModalPendingCredData(modelData);
    //     setModalPendingCredJson(jsonDoc);
    //     showModal();

    // }


    useEffect(() => {
        if (credential !== undefined && credential !== null) {
            let jsonDocParsed = JSON.parse(credential.documentJson);
            setJsonDoc(jsonDocParsed);

            let proofParsed = JSON.parse(jsonDocParsed.credentialSubject.proof);
            setProof(proofParsed)

            setContext(JSON.parse(proofParsed.claimData.context))

            setIsLoaded(true);
        }
    }, [credential])

    return (

        <>
            {
                isLoaded && (
                    <>
                        <Pressable onPress={()=> {setProofDoc(proof); showModal(); }} >
                            <View className="w-full flex justify-center items-center my-2">
                                <View className="w-[95%] h-[200px] bg-red-500 rounded-lg flex justify-between">

                                    <View className="w-full h-10 mt-5 flex justify-center items-end" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                                        <Text className="text-md font-bold text-gray-200 mr-5 opacity-100">Issued {jsonDoc.issuanceDate}</Text>
                                    </View>

                                    <View className="h-1/2 flex flex-row items-center">
                                        <Avatar.Text size={55} label="L" className="ml-5 bg-gray-500" />

                                        <View className="ml-4">
                                            <Text className="text-xl text-gray-200">{jsonDoc.credentialSubject.name}</Text>
                                            <Text className="text-md text-gray-200">Total Followers {context.extractedParameters.follower_count}</Text>
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