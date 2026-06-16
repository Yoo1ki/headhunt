import Image, { ImageProps } from 'next/image';
import cloudflareLoader from '@/lib/cloudflare-loader';

type CFImageProps = { isIcon?: boolean } & Omit<ImageProps, 'loader'>;

export const CFImage = ({
  src,
  alt,
  isIcon = false,
  ...props
}: CFImageProps) => {
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
