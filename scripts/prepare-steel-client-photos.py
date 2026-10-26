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
