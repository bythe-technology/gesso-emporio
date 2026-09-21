import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gesso Empório",
    short_name: "Gesso Empório",
    description: "O shopping da construção a seco em Registro/SP.",
    start_url: "/",
    display: "standalone",
    scope: "/",
    orientation: "portrait-primary",
    background_color: "#082c4b",
    theme_color: "#082c4b",
    lang: "pt-BR",
    icons: [
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
