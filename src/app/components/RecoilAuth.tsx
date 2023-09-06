import { atom } from 'recoil';

// type AuthState = firebase.User | null;

const authState = atom({
    key: 'authState',
    default: null,
    dangerouslyAllowMutability: true,
});

export const isLoggedInState = atom({
    key: 'isLoggedInState',
    default: false,
})