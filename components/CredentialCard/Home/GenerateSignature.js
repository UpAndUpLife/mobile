import { Signature, ethers } from "ethers";
import canonicalize from 'canonicalize';


export const GenerateSignature = async (appSecret, RequestedProofs) => {


  let wallet = new ethers.Wallet(appSecret)


  const signature = (await wallet.signMessage(
    ethers.getBytes(
      ethers.keccak256(
        new TextEncoder().encode(
          canonicalize(RequestedProofs)
        )
      )
    )
  ));

  console.log(signature);
}
