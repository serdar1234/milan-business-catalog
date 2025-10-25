// app/business/[id]/images/page.tsx

import { Gallery } from '@/layers/01_widgets/Gallery/ui/Gallery';
import { MOCK_BUSINESS_DETAILS } from '@/layers/03_entities/business/api/mockData';
// Здесь нужно импортировать полный список фотографий (если он отличается от MOCK_PHOTOS)
// Для простоты используем MOCK_BUSINESS_DETAILS.photos

interface ImagesPageProps {
  params: {
    id: string; // ID бизнеса из URL
  };
}

export default function BusinessImagesPage({ params }: ImagesPageProps) {
  // 🚨 В реальном приложении здесь будет запрос данных по params.id

  // Используем моки
  const businessData = {
    name: 'Osteria del Borgo',
    // photos: MOCK_BUSINESS_DETAILS.photos // Если бы у него было это поле
  };

  return (
    <Gallery
      // photos={businessData.photos}
      businessName={businessData.name}
    />
  );
}
