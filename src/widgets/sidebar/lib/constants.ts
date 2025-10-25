import {
  Building,
  ClipboardList,
  Cloud,
  HardDrive,
  Settings,
} from "lucide-react";

export const mainNavItems = [
  { icon: Cloud, label: "AI Mock Interview", path: "/mock-interview" },
  { icon: ClipboardList, label: "Interview History", path: "/history" },
];

export const betaFeaturesNavItems = [
  { icon: HardDrive, label: "CV Scorer", path: "/cv-scorer" },
  { icon: Building, label: "Company Researcher", path: "/company-researcher" },
  { path: "/settings", label: "Settings", icon: Settings },
];
