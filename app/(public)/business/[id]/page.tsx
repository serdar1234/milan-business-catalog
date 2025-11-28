import { BusinessPageWrapper } from '@/layers/01_widgets/BusinessPageWrapper/BusinessPageWrapper';
import { createServerStore } from '@/layers/03_entities/store/serverStore';
import { getCompanyDetails } from '@/layers/03_entities/business/businessApi';
import { BusinessHeader } from '@/layers/01_widgets/BusinessHeader/BusinessHeader';
import { MobileQuickActions } from '@/layers/01_widgets/MobileQuickActions/ui/MobileQuickActions';
import { notFound } from 'next/navigation';
import { getSSRPreferences } from '@/layers/04_shared/utils/getSSRPreferences';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const { lang } = await getSSRPreferences();
  const res = await fetch(
    `https://api.milanplaces.com/api/v1/companies/${id}?lang=${lang}`,
    {
      next: { revalidate: 60 },
    },
  );

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
  const { id } = await params;
  const { lang } = await getSSRPreferences();

  const store = createServerStore();
  const result = await store.dispatch(
    getCompanyDetails.initiate({ id, lang }, { forceRefetch: true }),
  );
  const { data, error } = result;

  if (error && 'status' in error && error.status === 404) {
    notFound();
  }

  if (error) {
    throw new Error('Failed to load business');
  }

  if (!data) {
    notFound();
  }

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
