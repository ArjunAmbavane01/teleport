import { cn } from "@workspace/ui/lib/utils";
import { Twitter, Linkedin, Github, Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import React from "react";

export function CenteredWithLogo() {
  const pages = [
    {
      title: "Product",
      href: "#",
    },
    {
      title: "Features", 
      href: "#",
    },
    {
      title: "Pricing",
      href: "#",
    },
    {
      title: "Company",
      href: "#",
    },
    {
      title: "Support",
      href: "#",
    },
  ];

  return (
    <div className="bg-black w-full relative overflow-hidden">
      {/* Call to Action Section */}
      <div className="border-b border-muted px-8 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Ready to teleport?
          </h3>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using Teleport to transform their workflow and accelerate their progress.
          </p>
          <Link
            href="#"
            className="inline-flex items-center px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-md transition-colors"
          >
            Get Started Today
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="border-t border-muted px-8 py-20 bg-black">
        <div className="max-w-7xl mx-auto text-sm text-muted-foreground justify-between items-start md:px-8">
          <div className="flex flex-col items-center justify-center w-full relative">
            <div className="mr-0 md:mr-4 md:flex mb-8">
              <Logo />
            </div>

            <ul className="transition-colors flex sm:flex-row flex-col text-muted-foreground list-none gap-8 mb-8">
              {pages.map((page, idx) => (
                <li key={"pages" + idx} className="list-none">
                  <Link
                    className="transition-colors hover:text-white"
                    href={page.href}
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>

            <GridLineHorizontal className="max-w-7xl mx-auto" />
          </div>
          <div className="flex sm:flex-row flex-col justify-between mt-8 items-center w-full">
            <p className="text-muted-foreground mb-8 sm:mb-0">
              &copy; 2024 Teleport. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="group">
                <Twitter className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
              <Link href="#" className="group">
                <Linkedin className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
              <Link href="#" className="group">
                <Github className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
              <Link href="#" className="group">
                <Facebook className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
              <Link href="#" className="group">
                <Instagram className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px", //-100px if you want to keep the line inside
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "w-[calc(100%+var(--offset))] h-[var(--height)]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    ></div>
  );
};

const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-0 items-center text-2xl font-inter relative z-20"
    >
      <span className="font-medium text-white">Telepor</span>
      <span className="font-medium text-white">t</span>
      <span className="w-2 h-2 bg-primary rounded-full ml-0.5"></span>
    </Link>
  );
};