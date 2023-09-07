'use client';
import '@/app/components/Firebase';
import './globals.css';
import { RecoilRoot } from "recoil";
import Auth from './components/Auth';
import Header from '@/app/components/Header';
import Navigator from '@/app/components/Navigator';

export default function RecoilRootContainer({ children }: { children: React.ReactNode }) {
    return <>
        <RecoilRoot>
            <Auth />
            <Header />
            <Navigator />
            {children}
        </RecoilRoot>
    </>
}