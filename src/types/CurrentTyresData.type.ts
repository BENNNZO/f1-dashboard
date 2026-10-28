export type CurrentTyresData = {
    Tyres: Record<string, CurrentTyre>
}

export type CurrentTyre = {
    Compound: string
    New: boolean
}
