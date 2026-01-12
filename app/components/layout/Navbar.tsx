'use client';
import { Button } from "../ui/button";
import Link from "next/link";

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from '../Navbar.module.css';

const Navbar = () => {


      const pathname = usePathname();
  
      const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
         <Link href="/" className={styles.logo}>
                    <Image 
                        src="/logo.svg" 
                        alt="The Legal Project Logo" 
                        width={64} 
                        height={64}
                        className={styles.logoImage}
                    />
                    <span>TheLegalProject</span>
                </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </a>
          <a
            href="/tools-to-make"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
             Tools to Make
          </a>
          <a
            href="/foundation"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Foundation
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
