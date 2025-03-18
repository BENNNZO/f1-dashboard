import Weather from "@/components/Weather"
import Drivers from "@/components/Drivers";
import Map from "@/components/Map";
import WebSocketTest from "@/components/WebSocketTest";

export default function Home() {
	return (
		<div className="h-screen bg-black p-2 text-white flex flex-col gap-2">
			<Weather />
            <Drivers />
            {/* <Map /> */}
			<WebSocketTest />
		</div>
	);
}
