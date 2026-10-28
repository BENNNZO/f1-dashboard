import Image from "next/image"

import { useWebSocketStore } from "@/store/webSocketStore"

type TireImageProps = {
    driverNumber: number
}

export default function TireImage({ driverNumber }: TireImageProps) {
    const currentTyres = useWebSocketStore((state) => state.data.CurrentTyres)

    return (
        <Image
            alt="tire-picture"
            src={`icons/tires/${currentTyres?.Tyres[driverNumber]?.Compound.toLowerCase() ?? "unknown"}.svg`}
            className="-mx-1 rounded-full outline outline-white/20"
            width={32}
            height={32}
        />
    )
}
