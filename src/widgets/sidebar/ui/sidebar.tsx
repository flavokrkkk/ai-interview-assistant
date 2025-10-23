import { useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import {
  Gauge,
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
        "flex h-screen flex-col justify-between border-r pb-2 border-gray-200 bg-white shadow-md transition-[width] duration-200 ease-linear overflow-hidden",
        isExpanded ? "w-64" : "w-16"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={cn(
          "flex items-center justify-center border-b h-16 bg-zinc-100",
          isExpanded ? "px-4" : "px-0"
        )}
      >
        <NavLink
          to="/"
          className={cn(
            "flex items-center text-gray-900 space-x-2",
            isExpanded ? "justify-start" : "justify-center w-full"
          )}
        >
          <Gauge className="h-6 w-6 flex-shrink-0 text-indigo-600" />
          <span
            className={cn(
              "whitespace-nowrap text-xl font-bold",
              "transition-all duration-150 ease-linear",
              isExpanded ? "opacity-100 w-auto ml-3" : "opacity-0 w-0 ml-0"
            )}
          >
            {isExpanded && "InterviewBoss"}
          </span>
        </NavLink>
      </div>

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

      <div className="p-3 h-16">
        <SidebarNavItem
          item={{ path: "/settings", label: "Settings", icon: Settings }}
          isExpanded={isExpanded}
        />
      </div>
    </div>
  );
};
