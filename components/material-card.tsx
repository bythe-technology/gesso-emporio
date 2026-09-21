import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { MaterialCategory } from "@/lib/site-data";

export function MaterialCard({ category, index }: { category: MaterialCategory; index: number }) {
  const Icon = category.icon;
  return (
    <Link href={`/materiais/${category.slug}`} className="material-card">
      <span className="material-index">{String(index + 1).padStart(2, "0")}</span>
      <span className="material-icon"><Icon aria-hidden="true" /></span>
      <div>
        <h3>{category.shortName}</h3>
        <p>{category.description}</p>
      </div>
      <span className="material-link">Conhecer materiais <ArrowUpRight size={18} aria-hidden="true" /></span>
    </Link>
  );
}
