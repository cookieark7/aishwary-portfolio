import { Header } from "@/components/Header";
import { Rail } from "@/components/Rail";
import { ScrollProgress } from "@/components/ScrollProgress";
import { TourProvider } from "@/components/TourProvider";
import { Commons } from "@/components/rooms/Commons";
import { Corridor } from "@/components/rooms/Corridor";
import { Doorway } from "@/components/rooms/Doorway";
import { InstrumentWall } from "@/components/rooms/InstrumentWall";
import { ReadingRoom } from "@/components/rooms/ReadingRoom";
import { Threshold } from "@/components/rooms/Threshold";
import { Workshop } from "@/components/rooms/Workshop";

export default function Home() {
  return (
    <TourProvider>
      <ScrollProgress />
      <Header />
      <Rail />
      <main>
        <Threshold />
        <Workshop />
        <InstrumentWall />
        <Corridor />
        <ReadingRoom />
        <Commons />
        <Doorway />
      </main>
    </TourProvider>
  );
}
