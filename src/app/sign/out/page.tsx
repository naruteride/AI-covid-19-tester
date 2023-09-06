'use client';
import {
    getAuth,
    
} from "firebase/auth";
import app from '@/app/components/Firebase'

export default function SignOut(): React.ReactElement {
    const auth = getAuth(app);


    return <>
    </>
}