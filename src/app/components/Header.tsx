import { useRecoilState } from "recoil"
import "./Header.css"
import { navigatorActivate } from "./Navigator"

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