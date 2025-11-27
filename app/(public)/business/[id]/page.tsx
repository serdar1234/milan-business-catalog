import BusinessPageClient from '@/layers/01_widgets/BusinessPageClient/BusinessPageClient';
import { createServerStore } from '@/layers/03_entities/store/serverStore';
import { getCompanyDetails } from '@/layers/03_entities/business/businessApi';
import { MOCK_BUSINESS_DETAILS } from '@/layers/04_shared/api/mocks/businessDetailsMocks';
import BusinessHeader from '@/layers/01_widgets/BusinessHeader/BusinessHeader';
import { MobileQuickActions } from '@/layers/01_widgets/MobileQuickActions/ui/MobileQuickActions';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export function generateMetadata() {
  return {
    title: MOCK_BUSINESS_DETAILS.name,
    description: MOCK_BUSINESS_DETAILS.description,
  };
}

export default async function BusinessPage({ params }: Props) {
  const { id } = await params;
  const lang = 'en';
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

  const preloadedState = store.getState();
  return (
    <>
      <BusinessHeader data={data} />
      <MobileQuickActions
        phone={MOCK_BUSINESS_DETAILS.phone}
        address={MOCK_BUSINESS_DETAILS.address}
        isFavorite={MOCK_BUSINESS_DETAILS.isFavorite}
      />
      <BusinessPageClient preloadedState={preloadedState} />;
    </>
  );
}
