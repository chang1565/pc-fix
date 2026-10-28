type IconName = "power" | "wifi" | "display" | "speed" | "audio" | "usb" | "search" | "book";

const paths: Record<IconName, string> = {
  power: "M12 3v9 M6.3 5.7a9 9 0 1 0 11.4 0",
  wifi: "M2 8a16 16 0 0 1 20 0 M5 12a11 11 0 0 1 14 0 M8.5 16a5.5 5.5 0 0 1 7 0 M12 20h.01",
  display: "M4 4h16a1 1 0 0 1 1 1v12H3V5a1 1 0 0 1 1-1Z M8 21h8 M12 17v4 M7 12l3-3 3 2 4-4",
  speed: "M4 19a10 10 0 1 1 16 0Z M12 14l5-6 M6 12h1 M12 5v1 M17 13h1",
  audio: "M4 14v-3a8 8 0 0 1 16 0v3 M4 12H2v7h4v-7Z M20 12h2v7h-4v-7Z M18 19c0 3-3 3-6 3",
  usb: "M12 21V3 M9 6l3-3 3 3 M12 15l-6-4V7 M12 12l6-3V5 M4 5h4v2H4Z M16 3h4v2h-4Z",
  search: "M16 16l5 5 M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
  book: "M12 5C9 3 5 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1Z M12 5v15",
};

export default function SupportIcon({ name, className }: { name: IconName; className?: string }) {
  return <svg className={className} aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name]} /></svg>;
}
