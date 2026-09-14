import { Header } from "@/components/Header";
import { Rail } from "@/components/Rail";
import { RoomMenu } from "@/components/RoomMenu";
import { ScrollProgress } from "@/components/ScrollProgress";
import { TourProvider } from "@/components/TourProvider";
import { About } from "@/components/rooms/About";
import { Contact } from "@/components/rooms/Contact";
import { Experience } from "@/components/rooms/Experience";
import { OpenSource } from "@/components/rooms/OpenSource";
import { Projects } from "@/components/rooms/Projects";
import { Skills } from "@/components/rooms/Skills";
import { Writing } from "@/components/rooms/Writing";

export default function Home() {
  return (
    <TourProvider>
      <ScrollProgress />
      <Header />
      <Rail />
      <RoomMenu />
      <main>
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Writing />
        <OpenSource />
        <Contact />
      </main>
    </TourProvider>
  );
}
