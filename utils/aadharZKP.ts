import { createCredential } from '@/api/wallet';
import { userWalletAtom } from '@/state/GlobalState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Proof, Reclaim } from '@reclaimprotocol/reactnative-sdk';
import { TrinsicService } from '@trinsic/trinsic';
import { useAtom } from 'jotai';
import { ToastType, useToast } from 'react-native-toast-notifications';

export async function startVerificationFlow(wallet: TrinsicService | null, toast: ToastType) {

  try {

    let authToken  = await AsyncStorage.getItem("authToken");
    const reclaimClient = new Reclaim.ProofRequest('0x99acCcc3cE3543442F1678402607C5C862DCE338'); // your app ID.
    const APP_SECRET = '0x9f48e3a082790f9a39d7827a740c5e3a07e3dc396b9d053a4386c10c25fbb3e0'; // your app secret key.
    console.log('startVerificationFlow');
    const providerIds = [
      '776941fa-5b20-4f07-b5b0-bbcec3a523b3', // Aadhaar Card Date of Birth (auto seleted)
    ];

    const appDeepLink = 'upandupmobile://';
    reclaimClient.setAppCallbackUrl(appDeepLink);

    reclaimClient.addContext('users address', 'add a message');

    await reclaimClient.buildProofRequest(providerIds[0]);

    reclaimClient.setSignature(
      await reclaimClient.generateSignature(APP_SECRET as string),
    );

    console.log(
      'signature',
      await reclaimClient.generateSignature(APP_SECRET as string),
    );

    const { requestUrl, statusUrl } =
      await reclaimClient.createVerificationRequest();

    await reclaimClient.startSession({
      onSuccessCallback: async proof => {


        let [msg, status] = await createCredential(authToken!,JSON.stringify(proof), "Instagram Follwers Proof");

        
        if (status === "success") {

          console.log(JSON.stringify(proof));
          toast.show("Ratings Imported", { type: "success" });

        }

        else {
          toast.show(msg, { type: status });
        }
      },
      onFailureCallback: error => {
        console.error('Verification failed', error);
        toast.show("Cannot get ratings", { type: "danger" });

      },
    });

  } catch (err) {
    console.log(err)
  }

}