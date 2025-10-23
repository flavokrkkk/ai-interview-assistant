import { useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import {
  Settings,
  Home,
  Table,
  Code,
  Database,
  Users,
  HardDrive,
  Cloud,
  Globe,
} from "lucide-react";
import { cn } from "@/shared/lib/mergeClass";
import { SidebarNavItem } from "./sidebarNavItem";
import { SidebarSeparator } from "./sidebarSeparator";
import { Image } from "@/shared/ui/image/image";

const mainNavItems = [
  { path: "/dashboard", label: "Project Overview", icon: Home },
  { path: "/editor", label: "Table Editor", icon: Table },
  { path: "/sql", label: "SQL Editor", icon: Code },
];

const betaFeaturesNavItems = [
  { path: "/database", label: "Database", icon: Database },
  { path: "/auth", label: "Authentication", icon: Users },
  { path: "/storage", label: "Storage", icon: HardDrive },
  { path: "/functions", label: "Edge Functions", icon: Cloud },
  { path: "/realtime", label: "Realtime", icon: Globe },
];

export const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleMouseEnter = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsExpanded(false);
  }, []);

  return (
    <div
      className={cn(
        "flex h-screen flex-col justify-between border-r space-y-2 border-gray-200 bg-white shadow-md transition-[width] duration-200 ease-linear overflow-hidden",
        isExpanded ? "w-64" : "w-16"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={cn(
          "flex items-center justify-center pt-4 pb-2",
          isExpanded ? "px-4 justify-start" : "px-0"
        )}
      >
        <NavLink
          to="/"
          className={cn(
            "flex items-center text-gray-900 space-x-1",
            isExpanded ? "justify-start" : "justify-center w-full"
          )}
        >
          <Image
            alt="logo-suspese"
            src="/images/logo.jpg"
            className="w-10 h-10 rounded-lg"
          />
          {isExpanded && (
            <span
              className={cn(
                "whitespace-nowrap text-xl font-bold",
                "transition-all duration-150 ease-linear",
                isExpanded ? "opacity-100 w-auto ml-3" : "opacity-0 w-0 ml-0"
              )}
            >
              AiCource
            </span>
          )}
        </NavLink>
      </div>
      <SidebarSeparator isExpanded={isExpanded} />

      <div className="flex flex-grow flex-col justify-start space-y-2 py-2">
        <nav className="flex flex-col space-y-1 px-3">
          {mainNavItems.map((item) => (
            <SidebarNavItem
              key={item.path}
              item={item}
              isExpanded={isExpanded}
            />
          ))}
        </nav>

        <SidebarSeparator isExpanded={isExpanded} />

        <nav className="flex flex-col space-y-1 px-3">
          {betaFeaturesNavItems.map((item) => (
            <SidebarNavItem
              key={item.path}
              item={item}
              isExpanded={isExpanded}
            />
          ))}
        </nav>
      </div>

      <SidebarSeparator isExpanded={isExpanded} />

      <div className="px-4 pb-2">
        <SidebarNavItem
          item={{ path: "/settings", label: "Settings", icon: Settings }}
          isExpanded={isExpanded}
        />
      </div>
    </div>
  );
};
