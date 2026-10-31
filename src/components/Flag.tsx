import Image from "next/image"

type FlagProps = {
    countryCode?: string
}

export default function Flag({ countryCode }: FlagProps) {
    return (
        <div className="absolute top-1 left-1 aspect-4/3 w-24">
            <Image
                className="absolute inset-0 size-full opacity-25 blur-xl"
                src={`/flags/${countryCode ?? "unknown"}.svg`}
                width={40}
                height={30}
                alt=""
            />

            <Image
                className="size-full rounded-lg"
                src={`/flags/${countryCode ?? "unknown"}.svg`}
                width={40}
                height={30}
                alt="country-flag"
            />
        </div>
    )
}
