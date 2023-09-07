'use client'
import { useRecoilValue, useRecoilState } from 'recoil';
import { userState } from './components/Auth';
import styles from './page.module.css';

export default function Uploader(): React.ReactElement {
    const user = useRecoilValue(userState);

    return <>
        <section className={styles.uploader}>
            {JSON.stringify(user)}
        </section>
    </>
}