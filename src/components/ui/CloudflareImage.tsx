import type { ImgHTMLAttributes } from 'react';

type CloudflareImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string;
};

export const CloudflareImage = ({
  src,
  alt,
  loading = 'lazy',
  decoding = 'async',
  ...props
}: CloudflareImageProps) => {
  const isDev = process.env.NODE_ENV === 'development';
  const assetPath = `/assets/${src}.png`;
  const finalSrc = isDev ? assetPath : `/cdn-cgi/image/format=auto${assetPath}`;

  return (
    // Asset images are optimized by Cloudflare at the edge, not Next.js.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      src={finalSrc}
      alt={alt}
      loading={loading}
      decoding={decoding}
    />
  );
};
