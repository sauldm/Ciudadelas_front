import { useSocket } from "../services/webSocket/socketProvider";
import NickModal from "./modal/nickModal";

export default function AppShell({ children }) {
    const { nick } = useSocket();
    return (
        <>
            {!nick && <NickModal />}
            {children}
        </>
    );
}
