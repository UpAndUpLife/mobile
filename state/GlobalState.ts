import { atom } from "jotai";
import { TrinsicService } from "@trinsic/trinsic";

export const loginAtom = atom(false);
export const userWalletAtom = atom<TrinsicService | null>(null);