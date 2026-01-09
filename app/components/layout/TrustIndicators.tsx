import { ShieldCheck, EyeOff, User } from "lucide-react";

const indicators = [
  {
    icon: ShieldCheck,
    title: "100% Free & Open Source",
    description: "No paywalls. No hidden fees. Our code is public for anyone to audit.",
  },
  {
    icon: EyeOff,
    title: "Private by Default",
    description: "Your data stays in your browser. We don't save, sell, or track your personal legal case.",
  },
  {
    icon: User,
    title: "Built for Pro Se Litigants",
    description: "Tools designed specifically for people representing themselves in court.",
  },
];

const TrustIndicators = () => {
  return (
    <section id="how-it-works" className="bg-secondary py-16">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {indicators.map((item, index) => (
            <div 
              key={item.title} 
              className="flex flex-col items-center text-center opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-foreground/70 leading-relaxed max-w-xs">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
