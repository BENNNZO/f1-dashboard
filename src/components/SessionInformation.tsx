import { useWebSocketStore } from "@/store/webSocketStore"
import Image from "next/image";

interface ISessionInfo {
    Meeting: {
        Key: number;
        Name: string;
        OfficialName: string;
        Location: string;
        Number: number;
        Country: {
            Key: number;
            Code: string;
            Name: string;
        };
        Circuit: {
            Key: number;
            ShortName: string;
        };
    };
    ArchiveStatus: {
        Status: string;
    };
    Key: number;
    Type: string;
    Name: string;
    StartDate: string;
    EndDate: string;
    GmtOffset: string;
    Path: string;
}

export default function SessionInformation() {
    const sessionInfo: ISessionInfo = useWebSocketStore(state => state.sessionInfo)

    if (sessionInfo) return (
        <div className="flex gap-2">
            {/* <Image src={`/flags/chn.svg`} width={10} height={40} alt="country-flag" className="h-8 w-10 object-cover rounded-full"/> */}
            <p className="px-4 py-1 bg-zinc-900 rounded-full h-8">{sessionInfo?.Name ?? ""}</p>
            <p className="px-4 py-1 bg-zinc-900 rounded-full h-8">{sessionInfo?.Meeting?.Name ?? ""}</p>
        </div>
    )
}