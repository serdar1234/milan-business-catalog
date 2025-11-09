import BusinessHeader from '@/layers/01_widgets/BusinessHeader/BusinessHeader';
import { MobileQuickActions } from '@/layers/01_widgets/MobileQuickActions/ui/MobileQuickActions';
import { MOCK_BUSINESS_DETAILS } from '@/layers/03_entities/business/api/mockData';

export default function BusinessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BusinessHeader />
      <MobileQuickActions
        phone={MOCK_BUSINESS_DETAILS.phone}
        address={MOCK_BUSINESS_DETAILS.address}
        isFavorite={MOCK_BUSINESS_DETAILS.isFavorite}
      />
      {children}
    </>
  );
}
