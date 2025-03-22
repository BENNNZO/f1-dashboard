import axios from "axios";
import { F1_CONSTANTS } from "../config/constants";

interface INegotiationResponse {
    encodedToken: string;
    cookie: string[];
}

// axios get f1 negotiation url and return encoded token and cookie
export default async function negotiate(): Promise<INegotiationResponse> {
    const { CLIENT_PROTOCOL, CONNECTION_DATA, BASE_URL } = F1_CONSTANTS

    try {
        const res = await axios.get(`https://${BASE_URL}/negotiate?clientProtocol=${CLIENT_PROTOCOL}&connectionData=${CONNECTION_DATA}`)

        const encodedToken = encodeURIComponent(res.data["ConnectionToken"])
        const cookie = res.headers["set-cookie"]

        if (!encodedToken || !cookie) throw new Error("Missing encodedToken or cookie")

        return { encodedToken, cookie }
    } catch (err) {
        throw new Error(`F1 negotiation failed ${(err as Error).message}`)
    }
}