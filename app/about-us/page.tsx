import HeroSection from "./components/HeroSection";
import BusinessVerticals from "./components/BusinessVerticals";
import CoreValues from "./components/CoreValues";
import VisionMission from "./components/VisionMission";
import timelineData from "@/data/TimelineData";
import { Timeline } from "@/components/ui/timeline";
import ContentSection from "./components/content-section";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      <HeroSection />
      <div className="bg-white">
        <ContentSection />
      </div>
      <BusinessVerticals />
      <CoreValues />
      <VisionMission />
      <Timeline data={timelineData} />
    </div>
  );
}
