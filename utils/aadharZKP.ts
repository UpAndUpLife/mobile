import { Reclaim } from '@reclaimprotocol/reactnative-sdk';

export async function startVerificationFlow() {

  try {

  const reclaimClient = new Reclaim.ProofRequest('0x046b76f77901A814C5425d2eB2d4A4c2c5FE8d8D'); // your app ID.
  const APP_SECRET = '0x040b668873e431d2276b4b9ff1da340ca6739f40ea362a7b07952dfb08a9536f'; // your app secret key.
  console.log('startVerificationFlow');
  const providerIds = [
    '5e1302ca-a3dd-4ef8-bc25-24fcc97dc800', // Aadhaar Card Date of Birth (auto seleted)
  ];

  const appDeepLink = 'mychat://chat/';
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

  console.log('Request URL:', requestUrl);
  console.log('Status URL:', statusUrl);

  await reclaimClient.startSession({
    onSuccessCallback: proof => {
      console.log('Verification success', proof);
      // Your business logic here
    },
    onFailureCallback: error => {
      console.error('Verification failed', error);
      // Your business logic here to handle the error
    },
  });

  } catch (err) {
    console.log(err)
  }
  

}