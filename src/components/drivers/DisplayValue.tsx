import { MinusIcon } from "lucide-react"
import type { ComponentPropsWithoutRef, CSSProperties } from "react"

import { mergeClasses } from "@/utils/mergeClasses"
import sanitizeText from "@/utils/sanitizeText"

type DisplayValueProps = ComponentPropsWithoutRef<"p"> & {
    value: string | number | undefined
    length: number
}

export default function DisplayValue({ value, length, ...props }: DisplayValueProps) {
    const sanitizedValue = sanitizeText(value, { length: length })

    return (
        <p
            {...props}
            style={{ "--length": `${length}ch` } as CSSProperties}
            className={mergeClasses("relative w-(--length) text-right font-semibold text-xl", props.className)}
        >
            {value ? (
                sanitizedValue
            ) : (
                <MinusIcon className="absolute top-1/2 right-0 size-4 -translate-y-1/2 stroke-3 text-zinc-800" />
            )}
        </p>
    )
}
