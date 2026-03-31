import { House, Person } from "@gravity-ui/icons";
import { ComponentType, SVGProps } from "react";

export const siteConfig = {
    name: "HeroUI",
}

export const navItems: {
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    label?: string;
    url: string;
    showBottomNav?: boolean;
}[] = [
    {icon: House, label: "Home", url: "/"},
    {icon: Person, label: "User", url: "/user"},
];
