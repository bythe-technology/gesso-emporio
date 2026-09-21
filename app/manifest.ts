import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gesso Empório",
    short_name: "Gesso Empório",
    description: "O shopping da construção a seco em Registro/SP.",
    start_url: "/",
    display: "standalone",
    background_color: "#082c4b",
    theme_color: "#082c4b",
    lang: "pt-BR",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
