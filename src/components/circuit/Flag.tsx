import Image from "next/image"

import { useCircuit } from "./CircuitContext"

export default function Flag() {
    const { countryCode } = useCircuit()

    return (
        <div className="absolute top-1 left-1 z-10 aspect-4/3 w-1/8 max-w-24">
            <Image
                className="absolute inset-0 size-full opacity-25 blur-xl"
                src={`/flags/${countryCode}.svg`}
                width={40}
                height={30}
                alt=""
            />

            <Image
                className="size-full rounded-md xl:rounded-lg"
                src={`/flags/${countryCode}.svg`}
                width={40}
                height={30}
                alt="country-flag"
            />
        </div>
    )
}
