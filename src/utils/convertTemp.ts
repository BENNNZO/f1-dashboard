export function FtoC(temp: number): number {
    return (temp - 32) * 5 / 9;
}

export function CtoF(temp: number): number {
    return (temp * 9 / 5) + 32;
}