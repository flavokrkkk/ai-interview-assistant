import { Building, ClipboardList, Cloud, UserCheck } from "lucide-react";

export const mainNavItems = [
  { icon: Cloud, label: "AI Mock Interview", path: "/mock-interview" },
  { icon: ClipboardList, label: "Interview History", path: "/history" },
];

export const betaFeaturesNavItems = [
  { icon: UserCheck, label: "CV Scorer", path: "/cv-scorer" },
  { icon: Building, label: "Company Researcher", path: "/company-researcher" },
];
