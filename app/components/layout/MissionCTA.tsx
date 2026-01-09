import { Button } from "../ui/button";
import { Github, Map } from "lucide-react";

const MissionCTA = () => {
  return (
    <section id="developers" className="bg-primary py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-primary-foreground mb-6">
            Justice is a bug. Let's patch it.
          </h2>
          
          <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            The legal system is an operating system that hasn't been updated in decades. 
            The Legal Project is a non-profit foundation dedicated to democratizing 
            law through technology.
          </p>

          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-6 md:p-8 border border-primary-foreground/20">
            <p className="text-primary-foreground font-medium mb-6">
              Are you a developer? Help us build the next generation of open legal infrastructure.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                variant="secondary" 
                size="lg"
                className="w-full sm:w-auto"
              >
                <Github className="w-4 h-4 mr-2" />
                View on GitHub
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Map className="w-4 h-4 mr-2" />
                View Roadmap
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionCTA;
