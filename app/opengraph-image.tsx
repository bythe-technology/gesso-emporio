import { ImageResponse } from "next/og";

export const alt = "Gesso Empório — materiais para construção a seco em Registro/SP";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "70px 76px", color: "white", background: "linear-gradient(135deg, #061f36 0%, #0b416f 64%, #24559a 100%)", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 36, fontWeight: 800 }}>
        <span style={{ color: "#ff870a", fontSize: 62, letterSpacing: -6 }}>GE</span>
        <span>Gesso Empório</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <span style={{ color: "#ff9a32", fontSize: 24, fontWeight: 800, letterSpacing: 4, textTransform: "uppercase" }}>O shopping da construção a seco</span>
        <span style={{ maxWidth: 920, fontSize: 76, lineHeight: 1.02, fontWeight: 800, letterSpacing: -4 }}>Materiais do piso ao teto em Registro/SP.</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#d4e2ef", fontSize: 24 }}><span>Drywall • Forros • Pisos • Steel frame</span><span>Vale do Ribeira</span></div>
    </div>,
    size,
  );
}
