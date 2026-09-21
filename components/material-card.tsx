import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { MaterialCategory } from "@/lib/site-data";

export function MaterialCard({ category, index }: { category: MaterialCategory; index: number }) {
  const Icon = category.icon;
  return (
    <Link href={`/materiais/${category.slug}`} className="material-card">
      <Image className="material-card-image" src={category.image} alt={category.imageAlt} fill sizes="(max-width: 760px) 100vw, (max-width: 1000px) 50vw, 25vw" />
      <span className="material-card-shade" aria-hidden="true" />
      <span className="material-index">{String(index + 1).padStart(2, "0")}</span>
      <span className="material-icon"><Icon aria-hidden="true" /></span>
      <div className="material-card-copy">
        <h3>{category.shortName}</h3>
        <p>{category.description}</p>
      </div>
      <span className="material-link">Conhecer materiais <ArrowUpRight size={18} aria-hidden="true" /></span>
    </Link>
  );
}
