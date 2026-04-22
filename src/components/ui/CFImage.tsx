import Image, { ImageProps } from "next/image";
import cloudflareLoader from "@/lib/cloudflare-loader";

type CFImageProps = Omit<ImageProps, "loader">;

export const CFImage = ({ src, alt, ...props }: CFImageProps) => {
  const isDev = process.env.NODE_ENV === "development";
  const finalSrc = props.unoptimized ? `/${src}.png` : `/assets/${src}.png`;
  return (
    <Image
      {...props}
      src={finalSrc}
      alt={alt}
      loader={isDev ? undefined : cloudflareLoader}
    />
  );
};
