import Weather from "@/components/Weather"
import Drivers from "@/components/Drivers";
import Map from "@/components/Map";

export default function Home() {
	return (
		<div className="h-screen bg-black p-2 text-white flex flex-col gap-2">
			<Weather />
            <Drivers />
            <Map />
		</div>
	);
}
