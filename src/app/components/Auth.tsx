import { atom, useSetRecoilState } from 'recoil';
import { getAuth, onAuthStateChanged } from "firebase/auth";


// type userState = firebase.User | null;

export const userState = atom({
    key: 'userState',
    default: null,
    dangerouslyAllowMutability: true,
});

// const auth = getAuth();

// export const setAuthState = useSetRecoilState(authState);

// setAuthState(auth.currentUser)
