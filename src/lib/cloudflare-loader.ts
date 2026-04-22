export default function cloudflareLoader({ src }: { src: string }) {
  return `/cdn-cgi/image/format=auto${src}`;
}
