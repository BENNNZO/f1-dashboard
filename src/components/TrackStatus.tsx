interface IStatus {
    Message: string,
    Status: string
}

export default function TrackStatus({ data }: { data: IStatus }) {
    const { Message, Status } = data

    return (
        <p style={{ backgroundColor: Status === "1" ? "#11bf5f" : Status === "2" ? "#bcbf11" : "#bf2511" }} className="px-3 py-1 rounded-full font-mono font-bold">
            {Message}
        </p>
    )
}