import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom: darkPersistAtom } = recoilPersist({
  key: "isDarkLocal",
  storage: localStorage,
});

export const isDarkAtom = atom({
  key: "isDark",
  default: true,
  effects_UNSTABLE: [darkPersistAtom],
});

const { persistAtom: loginPersistAtom } = recoilPersist({
  key: "isLogin",
  storage: localStorage,
});

export const isLoginAtom = atom({
  key: "isLogin",
  default: false,
  effects_UNSTABLE: [loginPersistAtom],
});
