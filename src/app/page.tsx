// 로컬
import Uploader from '@/app/main/Uploader';
import Dashboard from './main/Dashboard';
import Footer from '@/app/components/Footer';
import styles from '@/app/main/page.module.css';

export default function Main() {
    return (
        <main className={styles.main}>
            <Uploader />
            <Dashboard />
            <Footer />
        </main>
    )
}
