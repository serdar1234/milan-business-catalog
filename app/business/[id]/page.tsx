import BusinessHeader from '@/layers/01_widgets/BusinessHeader/ui/BusinessHeader';
import { MobileQuickActions } from '@/layers/01_widgets/MobileQuickActions/ui/MobileQuickActions';

import { MOCK_BUSINESS_DATA } from '@/layers/01_widgets/BusinessHeader/ui/BusinessHeader';

export default function BusinessPage() {
  return (
    <>
      <BusinessHeader />
      <MobileQuickActions
        phone={MOCK_BUSINESS_DATA.phone}
        address={MOCK_BUSINESS_DATA.address}
        isFavorite={MOCK_BUSINESS_DATA.isFavorite}
      />
    </>
  );
}
