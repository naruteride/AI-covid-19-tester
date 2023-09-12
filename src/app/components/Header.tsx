// 리코일
import { useRecoilState } from "recoil";
// 로컬
import { navigatorActivate } from "./Navigator";
import "./Header.css";

export default function Header(): React.ReactElement {
    const [activate, setActivate] = useRecoilState(navigatorActivate);

    return <>
        <header>
            <button onClick={() => {setActivate(!activate)}}>
                ☰
            </button>
        </header>
    </>
}