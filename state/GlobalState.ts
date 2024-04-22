import { atom } from "jotai";
import { TrinsicService } from "@trinsic/trinsic";
import { Offer,Credential } from "@/utils/Interfaces";

export const loginAtom = atom(false);
export const userWalletAtom = atom<TrinsicService | null>(null);
export const offersAtom = atom<Offer[]>([]);
export const credsAtom = atom<Credential[]>([]);