import Carousel from "@/components/Carousel";
import AboutSection from "@/components/home/AboutSection";
import ClientSection from "@/components/home/ClientSection";
import ProjectsFilterGrid from "@/components/home/ProjectsFilterGrid";

export default function Home() {
  return (
    <div className="bg-white  flex flex-col w-full">
      <Carousel />
      <AboutSection />
      <div className="bg-accent">
        <ProjectsFilterGrid />
      </div>
      <ClientSection />
    </div>
  );
}
