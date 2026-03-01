import NotificationStack from "@/components/landing/NotificationStack";
import HeroSection from "@/components/landing/HeroSection";
import PhoneCTA from "@/components/landing/PhoneCTA";
import WellsFargoCard from "@/components/landing/WellsFargoCard";

export default function LandingPage() {
  return (
    <main className="h-screen relative overflow-hidden bg-neutral-950 flex flex-col items-center justify-center gap-10 px-4">
      <NotificationStack />
      <h2 className="relative z-10 text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-orange-500">
        NotATrial
      </h2>
      <WellsFargoCard />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <HeroSection />
        <PhoneCTA />
      </div>
    </main>
  );
}
