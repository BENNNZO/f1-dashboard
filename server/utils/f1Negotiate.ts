import axios from "axios"

import { F1_CONSTANTS } from "../config/constants"

type NegotiationResponse = {
    encodedToken: string
    cookie: string
}

export default async function negotiate(): Promise<NegotiationResponse> {
    const { BASE_URL } = F1_CONSTANTS

    try {
        const res = await axios.post(`https://${BASE_URL}/negotiate?negotiateVersion=1`)

        const connectionToken = res.data.connectionToken
        const setCookie = res.headers["set-cookie"]

        if (!(connectionToken && setCookie)) throw new Error("Missing connectionToken or cookie")

        const encodedToken = encodeURIComponent(connectionToken)
        const cookie = setCookie.map((value) => value.split(";")[0]).join("; ")

        return { encodedToken, cookie }
    } catch (err) {
        throw new Error(`F1 negotiation failed ${(err as Error).message}`)
    }
}
