import { BusinessPageWrapper } from '@/layers/01_widgets/BusinessPageWrapper/BusinessPageWrapper';
import { BusinessHeader } from '@/layers/01_widgets/BusinessHeader/BusinessHeader';
import { MobileQuickActions } from '@/layers/01_widgets/MobileQuickActions/ui/MobileQuickActions';
import { notFound } from 'next/navigation';
import { getSSRPreferences } from '@/layers/04_shared/utils/getSSRPreferences';
import { BASE_URL } from '@/layers/03_entities/api/baseApi';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { lang } = await getSSRPreferences();
  const res = await fetch(`${BASE_URL}/companies/${slug}?lang=${lang}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return {
      title: 'Business not found',
      description: 'This business does not exist.',
    };
  }

  const json = await res.json();
  const business = json.data;

  return {
    title: business.name,
    description: business.description,
    openGraph: {
      title: business.name,
      description: business.description,
      images: business.images?.[0]?.url ? [business.images[0].url] : [],
    },
  };
}

export default async function BusinessPage({ params }: Props) {
  const { slug } = await params;
  const { lang } = await getSSRPreferences();

  const res = await fetch(`${BASE_URL}/companies/${slug}?lang=${lang}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    notFound();
  }

  const json = await res.json();
  const data = json.data;

  return (
    <>
      <BusinessHeader data={data} />
      <MobileQuickActions
        phone={data.phone}
        address={data.address}
        isFavorite={data.isFavorite || true}
      />
      <BusinessPageWrapper data={data} />;
    </>
  );
}
