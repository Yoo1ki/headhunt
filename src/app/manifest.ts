import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "headhunt.cc",
    short_name: "Headhunt",
    // description: "A Tool for Tracking Your Headhunt Pity Records",
    // start_url: "/",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    theme_color: "#232323",
    background_color: "#171717",
    display: "standalone",
  };
}
