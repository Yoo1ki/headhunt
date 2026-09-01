import type { ImageProps } from 'next/image';
import Image from 'next/image';
import cloudflareLoader from '@/lib/cloudflare-loader';

type CloudflareImageProps = { isIcon?: boolean } & Omit<ImageProps, 'loader'>;

export const CloudflareImage = ({
  src,
  alt,
  isIcon = false,
  ...props
}: CloudflareImageProps) => {
  const isDev = process.env.NODE_ENV === 'development';
  const finalSrc = isIcon ? `/${src}.png` : `/assets/${src}.png`;
  return (
    <Image
      {...props}
      src={finalSrc}
      alt={alt}
      loader={cloudflareLoader}
      unoptimized={props.unoptimized || isDev}
    />
  );
};
