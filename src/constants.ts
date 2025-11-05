import { ClipboardList, GitBranch, PanelTop, Server } from "lucide-react";
import { BiLogoTypescript } from "react-icons/bi";
import { FaNodeJs, FaPhp, FaPython, FaReact } from "react-icons/fa";
import { MdStyle } from "react-icons/md";

export const icons = [
  {
    name: "React",
    icon: FaReact,
  },
  {
    name: "TypeScript",
    icon: BiLogoTypescript,
  },
  {
    name: "PHP",
    icon: FaPhp,
  },
  {
    name: "Python",
    icon: FaPython,
  },
  {
    name: "Node.js",
    icon: FaNodeJs,
  },
  {
    name: "Backend",
    icon: Server,
  },
  {
    name: "Frontend",
    icon: PanelTop,
  },
  {
    name: "Code Style",
    icon: MdStyle,
  },
  {
    name: "Git",
    icon: GitBranch,
  },
  {
    name: "Onboarding",
    icon: ClipboardList,
  },
];
