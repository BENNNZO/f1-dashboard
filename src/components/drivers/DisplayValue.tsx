import { MinusIcon } from "lucide-react"
import type { ComponentPropsWithoutRef, CSSProperties } from "react"

import { mergeClasses } from "@/utils/mergeClasses"
import sanitizeText from "@/utils/sanitizeText"

type DisplayValueProps = ComponentPropsWithoutRef<"span"> & {
    value: string | number | undefined
    length: number
    align?: "left" | "right"
}

export default function DisplayValue({ value, length, align = "left", ...props }: DisplayValueProps) {
    const sanitizedValue = sanitizeText(value, { length: length })

    return (
        <span
            {...props}
            style={{ "--length": `${length}ch` } as CSSProperties}
            className={mergeClasses(
                "flex w-(--length) shrink-0 items-center font-semibold text-xl",
                align === "right" && "justify-end",
                props.className,
            )}
        >
            {value ? (
                sanitizedValue
            ) : (
                <span className="flex w-[1ch] justify-center">
                    <MinusIcon className="size-4 shrink-0 stroke-3 text-faint" />
                </span>
            )}
        </span>
    )
}
