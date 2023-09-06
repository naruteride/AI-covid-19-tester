'use client'
import { useRecoilValue, useRecoilState } from 'recoil';
import { userState } from './components/Auth';
import styles from './page.module.css';

export default function Uploader(): React.ReactElement {

    // const [user, setUser] = useRecoilState(userState);
    const user = useRecoilValue(userState);
    console.log(user);

    return <>
        <section className={styles.uploader}>
            {JSON.stringify(user)}
        </section>
    </>
}