"use client";

import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

type CustomImageProps = ImageProps & {
  fallbackSrc?: string;
  rounded?: boolean;
  shadow?: boolean;
  withTransition?: boolean;
};

export default function CustomImage({
  src,
  alt,
  fallbackSrc = "/fallback.png",
  rounded = false,
  shadow = false,
  withTransition = true,
  className,
  ...props
}: CustomImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={clsx(
        "relative overflow-hidden",
        rounded && "rounded-xl",
        shadow && "shadow-md",
        className
      )}
    >
      <Image
        {...props}
        src={error ? fallbackSrc : src}
        alt={alt}
        onError={() => setError(true)}
        onLoadingComplete={() => setLoaded(true)}
        className={clsx(
          "object-cover",
          withTransition && "transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
}
