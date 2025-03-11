import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function NavBar() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Store", path: "/store" },
    { name: "About", path: "/about" },
    { name: "Cart", path: "/cart" },
    { name: "User Profile", path: "/user-profile" },
    { name: "Settings", path: "/settings" },
    { name: "Purchases", path: "/purchases" }
  ];

  const authLinks = user?.id
    ? [{ name: "Sign Out", path: "/" }]
    : [{ name: "Log In", path: "/signin" }];

  return (
    <nav className="px-6 py-3 w-full border-b">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          BookHub
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-0 items-center">
          <ModeToggle />
          {navLinks.map((link) => (
            <Button key={link.path} variant="ghost" asChild>
              <Link to={link.path}>{link.name}</Link>
            </Button>
          ))}
          {authLinks.map((link) =>
            link.name === "Sign Out" ? (
              <SignOutButton key={link.path} />
            ) : (
              <Button key={link.path} variant="ghost" asChild>
                <Link to={link.path}>{link.name}</Link>
              </Button>
            )
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-6  max-w-[200px]">
            <div className="flex flex-col space-y-4 pt-10">
              {navLinks.map((link) => (
                <Button key={link.path} variant="ghost" asChild>
                  <Link to={link.path} onClick={() => setIsOpen(false)}>
                    {link.name}
                  </Link>
                </Button>
              ))}
              {authLinks.map((link) =>
                link.name === "Sign Out" ? (
                  <SignOutButton key={link.path} />
                ) : (
                  <Button key={link.path} variant="ghost" asChild>
                    <Link to={link.path} onClick={() => setIsOpen(false)}>
                      {link.name}
                    </Link>
                  </Button>
                )
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
