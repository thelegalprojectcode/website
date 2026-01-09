'use client';
import { Button } from "../ui/button";
import Link from "next/link";

import { usePathname } from 'next/navigation';
import styles from '../Navbar.module.css';

const Navbar = () => {


      const pathname = usePathname();
  
      const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="font-serif text-xl font-bold text-primary">
            TheLegalProject
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#mission"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Our Mission
          </a>
          <a
            href="#developers"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            For Developers
          </a>
          <a
            href="#donate"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Donate
          </a>
        </nav>

        {/* <div className={styles.links}>
                    <Link href="/" className={`${styles.link} ${isActive('/') ? styles.active : ''}`}>
                        Home
                    </Link>
                    <Link href="/tools-to-make" className={`${styles.link} ${isActive('/tools-to-make') ? styles.active : ''}`}>
                        Tools to Make
                    </Link>
                    <Link href="/foundation" className={`${styles.link} ${isActive('/foundation') ? styles.active : ''}`}>
                        Foundation
                    </Link>
                </div> */}

        <Button variant="default" className="hidden md:inline-flex">
          View Tools
        </Button>

        {/* Mobile menu button */}
        <Button variant="ghost" size="sm" className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
