import { Calendar, Calculator, FileText, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const tools = [
  {
    icon: Calendar,
    title: "Custody Visualizer",
    description: "Create clear, visual parenting calendars in minutes. Drag, drop, and export a conflict-free schedule for your court filing.",
    cta: "Launch Visualizer",
    href: "/parenting-schedule-visualizer",
  },
  {
    icon: Calculator,
    title: "Support Calculator",
    description: "Estimate child support obligations instantly based on official state guidelines. See exactly how the math works before you file.",
    cta: "Launch Calculator",
    href: "#calculator",
  },
  {
    icon: FileText,
    title: "Doc Gen",
    description: "Auto-fill common court filings without the legalese. Answer simple questions to generate a court-ready PDF.",
    cta: "Start Drafting",
    href: "#docgen",
  },
];

const Toolkit = () => {
  return (
    <section id="toolkit" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-3">
            The Toolkit
          </h2>
          <p className="text-muted-foreground">
            Beta tools available for immediate use.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {tools.map((tool, index) => (
            <Card 
              key={tool.title}
              className="group border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 md:p-8">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-5">
                  <tool.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                
                <h3 className="font-serif text-xl font-semibold mb-3">
                  {tool.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {tool.description}
                </p>

                <Button 
                  variant="outline" 
                  className="w-full border-primary text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {tool.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Toolkit;
