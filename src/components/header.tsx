import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  style: "header-secondary" | "header-primary" | "header-tertiary";
}

const Header = ({ title, style }: HeaderProps) => {
  return <div className={cn("header mb-6", style)}>{title}</div>;
};

export default Header;
