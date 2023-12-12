'use client';
// 파이어베이스
import '@/app/components/Firebase';
// 리코일
import { RecoilRoot } from "recoil";
// 스낵바
import { SnackbarProvider } from 'notistack';
// 로컬
import AuthProvider from '@/app/components/AuthProvider';
import Header from '@/app/components/Header';
import Navigator from '@/app/components/Navigator';
import './globals.css';

export default function RecoilRootContainer({ children }: { children: React.ReactNode }) {
    return <>
        <SnackbarProvider
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
        >
            <RecoilRoot>
                <Header />
                <Navigator />
                <AuthProvider>
                    {children}
                </AuthProvider>
            </RecoilRoot>
        </SnackbarProvider>
    </>
}