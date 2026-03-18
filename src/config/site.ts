import { BroadcastSignal, Comments, House, Person, Plus } from "@gravity-ui/icons";
import { ComponentType, SVGProps } from "react";

export const siteConfig = {
    name: "HeroUI3",
    description: "A modern UI library for React",
    
}

export const navItems: {
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    label?: string;
    url: string;
    showBottomNav?: boolean;
}[] = [
    {icon: House, label: "Home", url: "/"},
    {icon: BroadcastSignal, label: "Square", url: "/square"},
    {icon: Plus, url: "/publish", showBottomNav: false},
    {icon: Comments, label: "Message", url: "/message"},
    {icon: Person, label: "User", url: "/user"},
];