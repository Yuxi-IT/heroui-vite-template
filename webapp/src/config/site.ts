import { BroadcastSignal, Comments, House, Person, Plus } from "@gravity-ui/icons";
import { ComponentType, SVGProps } from "react";

export const siteConfig = {
    name: "Bliss",
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
<<<<<<< Updated upstream:webapp/src/config/site.ts
    {icon: Comments, label: "Messages", url: "/messages"},
=======
    {icon: Comments, label: "Message", url: "/messages"},
>>>>>>> Stashed changes:src/config/site.ts
    {icon: Person, label: "User", url: "/user"},
];
