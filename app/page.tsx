import Hero from "./components/layout/Hero";
import TrustIndicators from "./components/layout/TrustIndicators";
import Toolkit from "./components/layout/Toolkit";
import MissionCTA from "./components/layout/MissionCTA";
import Footer from "./components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <TrustIndicators />
        <Toolkit />
        <MissionCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
