const Footer = () => {
  return (
    <footer id="donate" className="bg-secondary border-t border-border">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1 - Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-serif text-lg font-bold text-primary">
              TheLegalProject
            </span>
            <p className="text-sm text-muted-foreground mt-2">
              © 2026 Open Law Tools Foundation.
            </p>
          </div>

          {/* Column 2 - Tools */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Tools</h4>
            <ul className="space-y-2">
              <li>
                <a href="/parenting-schedule-visualizer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Custody Visualizer
                </a>
              </li>
              <li>
                <a href="#calculator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Support Calculator
                </a>
              </li>
              <li>
                <a href="#docgen" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Doc Gen
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Organization */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Organization</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#donate" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Donate
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Legal */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="https://github.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-border">
        <div className="container py-6">
          <p className="text-sm text-foreground/70 leading-relaxed text-center max-w-4xl mx-auto">
            The Legal Project is a 501(c)(3) non-profit organization. We provide self-help 
            software and legal information. We are not a law firm and this is not legal advice. 
            If you need legal representation, please consult a licensed attorney.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
