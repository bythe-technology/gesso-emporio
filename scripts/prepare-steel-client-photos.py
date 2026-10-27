"""Preserve client pixels: crop chat UI, resize proportionally, compose on white."""
from pathlib import Path
from PIL import Image, ImageOps
import json

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path("C:/Users/victo/AppData/Local/Temp")
OUTPUT = ROOT / "public/images"
PHOTOS = {
    "produto-steel-frame-perfis-estruturais.webp": ("5e61313d-1bd0-401f-9989-5c61d77be40f", (12, 225, 420, 379)),
    "produto-steel-glasroc-x.webp": ("071f523a-d3ad-4fbb-9237-2c81a55121b1", (17, 202, 340, 524)),
    "produto-steel-placa-cimenticia.webp": ("d9808c80-92f4-4a8e-aaf1-c71677bc82ea", (16, 12, 338, 332)),
    "produto-steel-osb.webp": ("6149aadb-8c43-4038-a856-f75b8ddbb3b2", (9, 5, 330, 298)),
    "produto-steel-parafuso-glasroc.webp": ("a417652c-a3d4-4347-9a8e-9033d30c710b", (14, 9, 334, 329)),
    "produto-steel-parafuso-cimenticia.webp": ("49d99862-df8f-4bf9-b797-8c206084fd84", (12, 9, 331, 329)),
    "produto-steel-parafuso-perfil.webp": ("68198444-278e-47ce-b38e-71d975c70d8d", (17, 12, 338, 265)),
    "produto-steel-parafuso-osb.webp": ("4d54e7ce-caee-410a-9166-6b4b7e5924e5", (14, 7, 335, 292)),
    "produto-steel-ancoragem-concreto.webp": ("823e0d4c-48cc-426a-ba11-18eb2ce2467a", (20, 3, 340, 322)),
    "produto-steel-parabolt.webp": ("d6196557-b3ee-493d-9605-04ee2ea4162e", (16, 11, 336, 332)),
    "produto-steel-membrana.webp": ("c4014fd2-fc8e-4d22-b300-456d15886e10", (29, 203, 350, 524)),
    "produto-steel-tela-base-coat.webp": ("5000e666-61ea-4ab8-b727-0e849a1ba58e", (15, 10, 336, 321)),
    "produto-steel-base-coat.webp": ("b622310d-cb26-41ee-bc92-9d91bea7221f", (17, 7, 337, 326)),
    "produto-steel-fita-cimenticia.webp": ("95b7577f-3c97-470f-bd89-5f058ecd020e", (12, 4, 332, 326)),
    "produto-steel-cantoneira-pvc.webp": ("12c11aea-f195-4403-b019-b8a4b81be8e9", (18, 3, 336, 179)),
    "produto-steel-pingadeira-pvc.webp": ("12c11aea-f195-4403-b019-b8a4b81be8e9", (18, 245, 336, 565)),
    "produto-steel-ancorador.webp": ("c81a7b8f-b000-400d-a218-a66a9d4aa76a", (21, 255, 342, 575)),
    "produto-steel-cinta.webp": ("7e5ec9cc-dcba-4768-924e-f4ce2f6b8d83", (18, 11, 339, 330)),
    "produto-steel-tensionador.webp": ("38e0a829-1767-4d3d-b205-ed827cd85eec", (16, 1, 320, 243)),
    "produto-forros-drywall-cliente.webp": ("5447400b-4092-4d10-ac79-682886871863", (40, 278, 359, 494)),
    "produto-forro-pvc-junta-seca.webp": ("72d15269-f93d-4e52-aadb-66370bbb9ed8", (24, 7, 344, 254)),
    "produto-forro-pvc-rustico.webp": ("dfa3c232-115b-4b79-b906-806e9d728fe5", (30, 7, 348, 298)),
    "produto-forro-acabamento-u.webp": ("d4f9b0f3-7e89-42da-a1b1-1b9e93733921", (32, 11, 348, 188)),
    "produto-forro-acabamento-meia-cana.webp": ("d4f9b0f3-7e89-42da-a1b1-1b9e93733921", (31, 280, 348, 454)),
    "produto-forro-acabamento-premium.webp": ("8896faf9-e9b1-46fb-a033-eab27d0d724e", (20, 8, 336, 174)),
    "produto-forro-emenda-rigida.webp": ("8896faf9-e9b1-46fb-a033-eab27d0d724e", (20, 265, 336, 440)),
    "produto-forro-acabamento-f.webp": ("41ccfab9-b6c7-460c-b0b0-eea7a301793c", (16, 10, 332, 185)),
    "produto-forro-revid-sintra-brun-02.webp": ("094b8a1f-feac-4f2c-9f1f-5af5c1723e46", (27, 7, 325, 187)),
    "produto-forro-revid-sintra-fulvours-2.webp": ("1abda8b3-258d-41c1-a0c7-78705abafd19", (47, 7, 363, 216)),
    "produto-forro-revid-ebano-avela.webp": ("4e738cac-d3a0-4f99-ad82-c7d3b4b03040", (35, 7, 352, 202)),
    "produto-forro-revid-ebano-platina.webp": ("269a7d37-1ad9-4576-bd74-e1880ecaa63d", (30, 6, 348, 172)),
    "produto-forro-revid-painel-ripado.webp": ("269a7d37-1ad9-4576-bd74-e1880ecaa63d", (29, 279, 348, 487)),
    "produto-forro-isopor-stylo.webp": ("eb90dcc3-51c4-4fd3-9d3b-173404611411", (32, 35, 345, 270)),
    "produto-forro-isopor-originale.webp": ("d7fa0fc3-66a7-408f-b663-b912b43f90d8", (28, 35, 341, 318)),
    "produto-forro-isopor-standard.webp": ("2ec53b3e-6018-437c-a2df-a6458b2710bd", (44, 35, 357, 315)),
    "produto-forro-isopor-natural-wave.webp": ("fe81e4c7-a866-488f-9269-a6de5d482294", (24, 35, 337, 315)),
    "produto-forro-isopor-decore.webp": ("36a127de-6762-430f-a016-9ab42b1a85e7", (27, 35, 340, 315)),
    "produto-forro-isopor-black.webp": ("87528ed3-9b45-45e5-a3b0-7ff7e6230b3d", (21, 35, 334, 315)),
    "produto-forro-mineral-decore-standard.webp": ("a3b7137a-2ba2-47d1-845e-7b4c465c299c", (16, 9, 342, 337)),
    "produto-forro-mineral-espacoforro-austral.webp": ("e35b1505-8483-440d-aca9-1c6f388082a3", (23, 7, 348, 331)),
    "produto-forro-mineral-armstrong-georgian.webp": ("670e156f-842a-4232-9385-24e9d6dcbe73", (32, 11, 357, 335)),
    "produto-forro-mineral-cosmos-black.webp": ("bec647bd-237d-4dcb-b910-a260c2b971c0", (22, 7, 347, 330)),
    "produto-forro-acustico-rigitone-edge-12-25.webp": ("958de965-a5a5-44d8-aad4-9b4f69fac6f4", (3, 16, 323, 326)),
    "produto-forro-acustico-gyptone-big-quattro-41.webp": ("6567976b-8812-48b9-87fa-1d7e612c1b42", (13, 11, 338, 228)),
    "produto-forro-acustico-rigitone-edge-8-18.webp": ("ff6959e1-c5de-49b8-b288-1a3a3ddf4693", (24, 8, 347, 280)),
    "produto-forro-acustico-gyptone-quattro-20.webp": ("f7541571-967a-460b-86cc-509122e45583", (27, 12, 261, 283)),
    "produto-forro-acustico-rigitone-edge-8-15-20.webp": ("41068fcd-1d19-4bf9-b209-161754066dc3", (7, 3, 331, 313)),
    "produto-forro-acustico-isover.webp": ("eb3506e7-08ff-4843-90b6-65545943e9cf", (24, 35, 340, 335)),
    "produto-forro-acustico-isover-black.webp": ("339d7d77-43ae-4883-a7e7-76afaef5e703", (24, 35, 340, 326)),
}

def contain(photo, size):
    return ImageOps.contain(photo.convert("RGB"), size, Image.Resampling.LANCZOS)

def save(photo, filename):
    image = contain(photo, (1120, 820))
    canvas = Image.new("RGB", (1200, 900), "white")
    canvas.paste(image, ((1200-image.width)//2, (900-image.height)//2))
    canvas.save(OUTPUT / filename, "WEBP", quality=93, method=6)

def compose(names, filename, columns):
    canvas = Image.new("RGB", (1200, 900), "white")
    rows = (len(names)+columns-1)//columns
    cell_width, cell_height = 1120//columns, 820//rows
    for index, name in enumerate(names):
        # Tight bounding boxes only remove uniform whitespace, never rotate products.
        photo = originals[name]
        from PIL import ImageChops
        difference = ImageChops.difference(photo, Image.new("RGB", photo.size, "white"))
        bounds = difference.point(lambda value: 255 if value > 45 else 0).getbbox()
        if bounds:
            photo = photo.crop(bounds)
        image = contain(photo, (cell_width-60, cell_height-60))
        x = 40+(index%columns)*cell_width+(cell_width-image.width)//2
        y = 40+(index//columns)*cell_height+(cell_height-image.height)//2
        canvas.paste(image, (x,y))
    canvas.save(OUTPUT / filename, "WEBP", quality=93, method=6)

manifest_path = ROOT / "docs/product-photo-sources.json"
manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
originals = {}
for name, (identifier, crop) in PHOTOS.items():
    reference = f"codex-clipboard-{identifier}.png"
    photo = Image.open(SOURCE / reference).crop(crop).convert("RGB")
    originals[name] = photo
    save(photo, name)
    manifest[name] = {"kind":"client-original", "reference":reference, "crop":crop}

boards = ["produto-steel-glasroc-x.webp", "produto-steel-placa-cimenticia.webp", "produto-steel-osb.webp"]
fixings = [name for name in PHOTOS if "parafuso-" in name or "ancoragem-" in name or "parabolt" in name]
closing = ["produto-steel-membrana.webp", "produto-steel-tela-base-coat.webp", "produto-steel-base-coat.webp", "produto-steel-fita-cimenticia.webp", "produto-steel-cantoneira-pvc.webp", "produto-steel-pingadeira-pvc.webp"]
steel_accessories = ["produto-steel-ancorador.webp", "produto-steel-cinta.webp", "produto-steel-tensionador.webp"]
for name, items, columns in [
    ("produto-steel-frame-placas.webp", boards, 3),
    ("produto-steel-frame-fixadores.webp", fixings, 3),
    ("produto-steel-frame-fechamento.webp", closing, 3),
    ("produto-steel-frame-acessorios.webp", steel_accessories, 3),
]:
    compose(items, name, columns)
    manifest[name] = {"kind":"client-original", "compositionOf":items, "processing":"Original crops on white; proportional resize; no rotation or generative editing"}
manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")

(OUTPUT / "catalogo-steel-frame.webp").write_bytes((OUTPUT / "produto-steel-frame-perfis-estruturais.webp").read_bytes())
manifest["catalogo-steel-frame.webp"] = {**manifest["produto-steel-frame-perfis-estruturais.webp"], "derivedFrom":"produto-steel-frame-perfis-estruturais.webp"}
manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")

# Reuse every previously supplied installation accessory in the menu cover.
accessories = ["produto-parafuso-ttpc.webp", "produto-parafuso-trpf.webp", "produto-parafuso-bucha.webp", "produto-prego-aco.webp", "produto-welfix.webp", "produto-presilha-f530.webp", "produto-arame-galvanizado.webp", "produto-tirante-f530.webp", "produto-multifuncao-f530.webp", "produto-fita-telada-azul.webp", "produto-fita-telada-branca.webp", "produto-fita-papel.webp", "produto-fita-aluminio.webp", "produto-fita-pvc.webp", "produto-veu-vidro.webp", "produto-fincapinos.webp"]
for name in accessories:
    originals[name] = Image.open(OUTPUT / name).convert("RGB")
compose(accessories, "produto-complementos.webp", 4)
manifest["produto-complementos.webp"] = {"kind":"client-original", "compositionOf":accessories, "processing":"Existing original photographs assembled without rotation or generative editing"}
manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")

# Preserve the client's separate forro products and REVID finishes as individual cards.
forro_pvc = [
    "produto-forro-pvc-junta-seca.webp",
    "produto-forro-pvc-rustico.webp",
    "produto-forro-acabamento-u.webp",
    "produto-forro-acabamento-meia-cana.webp",
    "produto-forro-acabamento-premium.webp",
    "produto-forro-emenda-rigida.webp",
    "produto-forro-acabamento-f.webp",
]
forro_vinilicos = [
    "produto-forro-revid-sintra-brun-02.webp",
    "produto-forro-revid-sintra-fulvours-2.webp",
    "produto-forro-revid-ebano-avela.webp",
    "produto-forro-revid-ebano-platina.webp",
    "produto-forro-revid-painel-ripado.webp",
]
for filename, items, columns in [
    ("produto-forros-pvc-cliente.webp", forro_pvc, 3),
    ("produto-forros-vinilicos-cliente.webp", forro_vinilicos, 3),
]:
    compose(items, filename, columns)
    manifest[filename] = {"kind":"client-original", "compositionOf":items, "processing":"Client's original product photographs on white; proportional resize only; no rotation or generative editing"}

forro_isopor = [
    "produto-forro-isopor-stylo.webp",
    "produto-forro-isopor-originale.webp",
    "produto-forro-isopor-standard.webp",
    "produto-forro-isopor-natural-wave.webp",
    "produto-forro-isopor-decore.webp",
    "produto-forro-isopor-black.webp",
]
compose(forro_isopor, "produto-forros-isopor-cliente.webp", 3)
manifest["produto-forros-isopor-cliente.webp"] = {"kind":"client-original", "compositionOf":forro_isopor, "processing":"Client's original product photographs and model labels on white; proportional resize only; no rotation or generative editing"}

forro_mineral = [
    "produto-forro-mineral-decore-standard.webp",
    "produto-forro-mineral-espacoforro-austral.webp",
    "produto-forro-mineral-armstrong-georgian.webp",
    "produto-forro-mineral-cosmos-black.webp",
]
forro_acusticos = [
    "produto-forro-acustico-rigitone-edge-12-25.webp",
    "produto-forro-acustico-gyptone-big-quattro-41.webp",
    "produto-forro-acustico-rigitone-edge-8-18.webp",
    "produto-forro-acustico-gyptone-quattro-20.webp",
    "produto-forro-acustico-rigitone-edge-8-15-20.webp",
    "produto-forro-acustico-isover.webp",
    "produto-forro-acustico-isover-black.webp",
]
for filename, items, columns in [
    ("produto-forros-mineral-cliente.webp", forro_mineral, 2),
    ("produto-forros-acusticos-cliente.webp", forro_acusticos, 3),
]:
    compose(items, filename, columns)
    manifest[filename] = {"kind":"client-original", "compositionOf":items, "processing":"Client's original product photographs on white; proportional resize only; no rotation or generative editing"}
manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
