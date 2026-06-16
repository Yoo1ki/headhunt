import { getLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';

export default async function NotFound() {
  const locale = await getLocale();

  redirect(`/${locale}`);
}
