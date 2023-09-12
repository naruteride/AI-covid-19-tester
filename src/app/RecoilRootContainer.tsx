'use client';
import '@/app/components/Firebase';
import './globals.css';
import { RecoilRoot } from "recoil";
import Auth from './components/Auth';
import Header from '@/app/components/Header';
import Navigator from '@/app/components/Navigator';
import { SnackbarProvider } from 'notistack'

export default function RecoilRootContainer({ children }: { children: React.ReactNode }) {
    return <>
        <SnackbarProvider
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
        >
            <RecoilRoot>
                <Auth />
                <Header />
                <Navigator />
                {children}
            </RecoilRoot>
        </SnackbarProvider>
    </>
}