"use client";

import { useState } from "react";

type RemoteProductImageProps = {
  alt: string;
  fallbackSrc: string;
  src: string;
};

export function RemoteProductImage({ alt, fallbackSrc, src }: RemoteProductImageProps) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setImageSrc(fallbackSrc)}
    />
  );
}
