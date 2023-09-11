// 'use client'
import styles from '@/app/main/page.module.css';
import Uploader from '@/app/main/Uploader';
import Footer from '@/app/components/Footer';
import Dashboard from './main/Dashboard';

export default function Main() {
    return (
        <main className={styles.main}>
            <Uploader />
            <Dashboard />
            <Footer />
        </main>
    )
}
