import { Button } from "../ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-24 md:py-32 lg:py-40">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight animate-fade-in">
            Access to justice shouldn't
            <br className="hidden sm:block" />
            depend on your bank&nbsp;account.
          </h1>
          
          <p className="mt-6 md:mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto opacity-0 animate-fade-in-up [animation-delay:200ms]">
            We build open-source software to help you navigate the legal system. 
            Our tools are free to use, private by default, and designed to help 
            you represent yourself with confidence.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 opacity-0 animate-fade-in-up [animation-delay:400ms]">
            <Button 
              size="lg" 
              variant="accent"
              className="text-base px-8 py-6"
            >
              Start Using Free Tools
            </Button>
            
            <a 
              href="#how-it-works" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
            >
              How it works
              <ArrowDown className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
