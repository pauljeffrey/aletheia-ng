import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/jeffreyotoibhi/",
    label: "LinkedIn",
    icon: FaLinkedin,
  },
  {
    href: "https://github.com/pauljeffrey",
    label: "GitHub",
    icon: FaGithub,
  },
  {
    href: "https://twitter.com/Jeffreypaul_",
    label: "Twitter",
    icon: FaTwitter,
  },
] as const;

export const COMPANY_EMAIL = "drjeffrey.paul@aletheia.com.ng";
export const FOUNDER_EMAIL = "jeffreyotoibhi@gmail.com";

export const COMPANY_PHONES = [
  { label: "US", display: "+1 (204) 230-2149", href: "tel:+12042302149" },
  { label: "Nigeria", display: "+234 902 772 8309", href: "tel:+2349027728309" },
] as const;
