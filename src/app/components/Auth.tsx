import { atom, useSetRecoilState } from 'recoil';
import { getAuth, onAuthStateChanged, User } from "firebase/auth";


// type UserState = User | null;

export const userState = atom({
    key: 'userState',
    default: null,
    dangerouslyAllowMutability: true,
});
