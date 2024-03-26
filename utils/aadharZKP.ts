import { Proof, ReclaimClient, RequestedProofs } from "@reclaimprotocol/reactnative-sdk";

export const getVerificationReq = async () => {

  const reclaimClient = new ReclaimClient("0xDD192dE4F4a577fA9529b9a0aF5F49b5940F2590");
  const appDeepLink = 'mychat://chat/';
  const providers = ['5e1302ca-a3dd-4ef8-bc25-24fcc97dc800'];
  const PRIVATE_KEY = '0xbd31ecacdff8a65ac296320b9ca993355e98c3d88c09c8424ef9f7ed575862d2';

  reclaimClient.setAppCallbackUrl(appDeepLink);

  const providerV2 = await reclaimClient.buildHttpProviderV2ByID(providers);
  const requestProofs = await reclaimClient.buildRequestedProofs(
    providerV2,
    appDeepLink,
  );

  let sign = await getSignature(requestProofs, PRIVATE_KEY);
  
  reclaimClient.setSignature(sign);

  const req = await reclaimClient.createVerificationRequest(providers);

  req.on('success', (data: Proof | unknown) => {
    if (data) {
      const proof = data as Proof;
      console.log('success', proof.extractedParameterValues);
      setExtracted(JSON.stringify(proof.extractedParameterValues));
    }
  });
  setVerificationReq(req);
};

const getSignature = async (
  requestProofs: RequestedProofs,
  appSecret: string,
) => {
  const signature = await reclaimClient.getSignature(
    requestProofs,
    appSecret,
  );
  return signature;
};
