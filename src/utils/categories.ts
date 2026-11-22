import type { BGPProvider } from "./types";

export interface CategoryConfig {
  title: string;
  description: string;
  heading: string;
  subheading: string;
  emptyText: string;
  filter: (entry: { data: BGPProvider }) => boolean;
}

export const CATEGORIES: Record<string, CategoryConfig> = {
  dedicated: {
    title: "BGP Dedicated Servers Directory | BGP.mom",
    description:
      "Compare the best dedicated server providers offering BGP sessions. Find high-performance, BGP-enabled bare metal servers for your network.",
    heading: "Dedicated Server Providers",
    subheading:
      "VPS providers offering dedicated servers and bare metal hosting with BGP support",
    emptyText: "No dedicated server providers found.",
    filter: (entry) =>
      entry.data.services?.some((s) =>
        s.toLowerCase().includes("baremetal"),
      ) ?? false,
  },
  tunnels: {
    title: "BGP Tunnels & Free BGP Tunnel Providers | BGP.mom",
    description:
      "Looking for a BGP tunnel? Find and compare providers offering remote BGP sessions via GRE or WireGuard, including free BGP tunnel options.",
    heading: "BGP Tunnel Providers",
    subheading: "Providers offering a BGP tunnel (GRE, IPSec, WireGuard)",
    emptyText: "No tunnel providers found.",
    filter: (entry) =>
      entry.data.services?.some((s) =>
        s.toLowerCase().includes("tunnel"),
      ) ?? false,
  },
  colocation: {
    title: "BGP-enabled Colocation Providers Directory | BGP.mom",
    description:
      "Find and compare top BGP-enabled colocation providers. A community-curated directory of data centers offering BGP sessions for your ASN.",
    heading: "Colocation Providers",
    subheading:
      "Providers offering colocation services with BGP support",
    emptyText: "No colocation providers found.",
    filter: (entry) =>
      entry.data.services?.some((s) =>
        s.toLowerCase().includes("colocation"),
      ) ?? false,
  },
  transit: {
    title: "IP Transit Providers Directory | BGP.mom",
    description:
      "Compare the best IP Transit providers for your network. Find reliable upstream providers offering full or partial BGP routing tables.",
    heading: "IP Transit Providers",
    subheading:
      "Providers offering IP transit and bandwidth services with BGP support",
    emptyText: "No IP transit providers found.",
    filter: (entry) =>
      entry.data.services?.some(
        (s) =>
          s.toLowerCase().includes("transit") ||
          s.toLowerCase().includes("ip transit"),
      ) ?? false,
  },
  ixp: {
    title: "IXP Access Providers with BGP Support | BGP.mom",
    description:
      "Find Internet Exchange Point (IXP) access providers offering BGP support. Connect to major exchanges and peer with other networks globally.",
    heading: "IXP Access Providers",
    subheading:
      "Providers offering Internet Exchange Point access with BGP peering",
    emptyText: "No IXP access providers found.",
    filter: (entry) =>
      entry.data.services?.some((s) =>
        s.toLowerCase().includes("ixp"),
      ) ?? false,
  },
  lir: {
    title: "LIR Services & ASN Registration Providers | BGP.mom",
    description:
      "Find Local Internet Registry (LIR) service providers. Compare providers for ASN registration, IPv4/IPv6 resource allocation, and BGP support.",
    heading: "LIR Service Providers",
    subheading:
      "Local Internet Registry services for IP allocations and ASN registration",
    emptyText: "No LIR service providers found.",
    filter: (entry) =>
      entry.data.services?.some((s) =>
        s.toLowerCase().includes("lir"),
      ) ?? false,
  },
};