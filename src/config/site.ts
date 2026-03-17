import { House, Magnifier, Person } from "@gravity-ui/icons";
import { ComponentType, SVGProps } from "react";

export const siteConfig = {
    name: "HeroUI3",
    description: "A modern UI library for React",
    
}

export const navItems: {
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    label: string;
    url: string
}[] = [
    {icon: House, label: "Home", url: "/"},
    {icon: Magnifier, label: "About", url: "/about"},
    {icon: Person, label: "Contact", url: "/contact"},
];