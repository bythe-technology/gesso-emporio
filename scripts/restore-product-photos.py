"""Restore client photographs and publisher assets without generative editing.

Only cropping, proportional resizing and WebP encoding are performed. The crop
rectangles exclude WhatsApp captions and badges without altering product pixels.
"""
from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen
import json
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "images"
CLIENT = Path("C:/Users/victo/AppData/Local/Temp")

CLIENT_PHOTOS = {
    "produto-gesso-40kg.webp": ("de6a6b2f-5702-4e74-90e9-15122f61f325", (26, 35, 350, 324)),
    "produto-gesso-cola.webp": ("99095a3b-ddbb-4a35-9127-5cc9187a5b9d", (17, 6, 342, 330)),
    "produto-parafuso-ttpc.webp": ("ad95c50f-8525-4f2f-979e-a95dacd91fec", (30, 14, 351, 326)),
    "produto-parafuso-trpf.webp": ("ad95c50f-8525-4f2f-979e-a95dacd91fec", (32, 480, 347, 603)),
    "produto-parafuso-bucha.webp": ("0faf713f-d063-4864-8084-1adc32c80040", (30, 1, 261, 260)),
    "produto-prego-aco.webp": ("0faf713f-d063-4864-8084-1adc32c80040", (30, 324, 262, 565)),
    "produto-welfix.webp": ("4f04bf2c-396e-44fd-bce5-93674aec92bf", (21, 8, 346, 189)),
    "produto-presilha-f530.webp": ("4f04bf2c-396e-44fd-bce5-93674aec92bf", (26, 258, 345, 577)),
    "produto-arame-galvanizado.webp": ("61e61be8-f7bd-4aa8-bc2d-4ef7951748c7", (19, 47, 344, 319)),
    "produto-fita-telada-azul.webp": ("29a0618c-ffeb-4193-a415-1aef2cd6cade", (21, 40, 344, 278)),
    "produto-fita-telada-branca.webp": ("29a0618c-ffeb-4193-a415-1aef2cd6cade", (22, 384, 253, 650)),
    "produto-fita-papel.webp": ("0109457e-8846-487c-b515-fdbdba6d7ba3", (30, 25, 353, 344)),
    "produto-fita-aluminio.webp": ("0109457e-8846-487c-b515-fdbdba6d7ba3", (30, 391, 352, 713)),
    "produto-fita-pvc.webp": ("1c5bcf2b-bc32-495d-9e98-88f2f0b5f025", (41, 43, 367, 300)),
    "produto-veu-vidro.webp": ("1c5bcf2b-bc32-495d-9e98-88f2f0b5f025", (41, 349, 365, 666)),
    "produto-tirante-f530.webp": ("de9fe2ab-c73f-44b0-8099-bc6137c01075", (61, 175, 382, 493)),
    "produto-multifuncao-f530.webp": ("ff9a49b7-6668-4394-8c75-ceecee7b1d57", (65, 30, 384, 265)),
    "produto-fincapinos.webp": ("ff9a49b7-6668-4394-8c75-ceecee7b1d57", (64, 411, 295, 644)),
}

PUBLISHER_PHOTOS = {
    "produto-massas.webp": ("https://www.placo.com.br/produtos/placomix-e", "https://www.placo.com.br/sites/mac3.placo.com.br/files/styles/product_gallery/public/2025-10/3D_Placomix_Balde_15kg_PNG.png.webp?itok=JMzDWpj2"),
    "produto-perfil-f530.webp": ("https://www.placo.com.br/produtos/perfil-f530", "https://www.placo.com.br/sites/mac3.placo.com.br/files/styles/product_gallery/public/2023-08/perfil_f530.jpg.webp?itok=3aCtxvUK"),
    "produto-montantes-drywall.webp": ("https://www.placo.com.br/produtos/montante", "https://www.placo.com.br/sites/mac3.placo.com.br/files/styles/product_gallery/public/2023-08/montante_70.jpg.webp?itok=L2l6ogng"),
    "produto-guias-drywall.webp": ("https://www.placo.com.br/produtos/guia", "https://www.placo.com.br/sites/mac3.placo.com.br/files/styles/product_gallery/public/2023-08/guia_70.jpg.webp?itok=rfWQR2X8"),
    "produto-performa-st.webp": ("https://www.placo.com.br/produtos/performance/placa-performa-125-mm", "https://www.placo.com.br/sites/mac3.placo.com.br/files/styles/product_gallery/public/2024-02/PLACA%20PERFORMA.png.webp?itok=iVnMPu4l"),
    "produto-performa-ru.webp": ("https://www.placo.com.br/produtos/performance/placa-performa-ru-125-mm", "https://www.placo.com.br/sites/mac3.placo.com.br/files/styles/product_gallery/public/2024-09/Performa_RU.jpg.webp?itok=ZYj_lxk4"),
    "produto-tabica-branca.webp": ("https://multiperfil.com.br/produto/tabica-lisa-pintada/", "https://multiperfil.com.br/wp-content/uploads/2024/06/2-Tabica-Lisa-Foto-Produto-Pintada-min.jpg"),
    "produto-cantoneira-25x30.webp": ("https://multiperfil.com.br/produto/cantoneira-25x30/", "https://multiperfil.com.br/wp-content/uploads/2024/06/2-Cantoneira-25x30-Foto-Produto-min.jpg"),
    "produto-cantoneira-perfurada.webp": ("https://multiperfil.com.br/produto/cantoneira-perfurada-23x23/", "https://multiperfil.com.br/wp-content/uploads/2024/06/CANTONEIRA_PERFURADA-min.jpg"),
}

def save_photo(photo, filename):
    # Preserve the entire subject and printed text; never stretch or crop to fill.
    photo = photo.convert("RGBA")
    white = Image.new("RGBA", photo.size, "white")
    white.alpha_composite(photo)
    photo = ImageOps.contain(white.convert("RGB"), (1120, 820), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (1200, 900), "white")
    canvas.paste(photo, ((1200-photo.width)//2, (900-photo.height)//2))
    canvas.save(OUTPUT / filename, "WEBP", quality=92, method=6)

def main():
    sources = {}
    for name, (identifier, rectangle) in CLIENT_PHOTOS.items():
        source = CLIENT / f"codex-clipboard-{identifier}.png"
        save_photo(Image.open(source).crop(rectangle), name)
        sources[name] = {"kind": "client-original", "reference": source.name, "crop": rectangle}
        print("Client:", name)
    for name, (page, url) in PUBLISHER_PHOTOS.items():
        request = Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urlopen(request, timeout=45) as response:
            photo = Image.open(BytesIO(response.read()))
            save_photo(photo, name)
        sources[name] = {"kind": "manufacturer-catalog", "page": page, "asset": url}
        print("Publisher:", name)
    save_photo(Image.open(OUTPUT / "produto-ferramentas-cliente.webp"), "produto-ferramentas-eletricas.webp")
    sources["produto-ferramentas-eletricas.webp"] = {"kind": "client-original", "reference": "produto-ferramentas-cliente.webp"}
    covers = {
        "produto-gesso-familia.webp": "produto-gesso-40kg.webp",
        "produto-perfis.webp": "produto-perfil-f530.webp",
        "produto-complementos.webp": "produto-parafuso-bucha.webp",
        "produto-sistema-f530.webp": "produto-perfil-f530.webp",
        "produto-placa-performa.webp": "produto-performa-st.webp",
    }
    for name, source in covers.items():
        (OUTPUT / name).write_bytes((OUTPUT / source).read_bytes())
        sources[name] = {**sources[source], "derivedFrom": source}
    (ROOT / "docs").mkdir(exist_ok=True)
    (ROOT / "docs" / "product-photo-sources.json").write_text(json.dumps(sources, indent=2, ensure_ascii=False)+"\n", encoding="utf-8")

if __name__ == "__main__":
    main()
