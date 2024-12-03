import { cn } from "@/lib/utils";
import { MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MobileNavBar = ({
  navItems,
}: {
  navItems: { name: string; href: string; isActive: boolean }[];
}) => {
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();
  const onNavigate = (href: string) => {
    navigate(href);
    onClose();
  };

  const onClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <>
      {!open && (
        <div
          onClick={() => setOpen(true)}
          className="absolute cursor-pointer flex md:hidden bg-white p-2 rounded-full shadow-md shadow-gray-300 text-primary_red left-4 top-4 sm:left-10 sm:top-10"
        >
          <MenuIcon className="" />
        </div>
      )}
      {(open || isClosing) && (
        <div className="flex flex-col relative md:hidden">
          <div className="mobile-navbar-overlay" onClick={onClose} />
          <div
            className={cn(
              "mobile-navbar-content",
              isClosing &&
                "mobile-navbar-closing" /* Animation when the navbar is closing */
            )}
          >
            <X
              onClick={onClose}
              className="absolute cursor-pointer right-3 top-3 text-white"
            />
            {navItems.map((item) => (
              <div
                onClick={() => onNavigate(item.href)}
                className={cn(
                  "p-3 text-white cursor-pointer ",
                  item.isActive && "bg-primary_red",
                  !item.isActive && "text-primary_light"
                )}
                key={item.href}
              >
                <div key={item.href} className="fade-in-left font-semibold">
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavBar;
