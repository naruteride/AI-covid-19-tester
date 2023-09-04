import styles from './page.module.css'
import Uploader from './Uploader'
import Footer from '@/app/components/Footer';

export default function Main() {
    return (
        <main className={styles.main}>
            <Uploader />
            <Footer />
        </main>
    )
}
