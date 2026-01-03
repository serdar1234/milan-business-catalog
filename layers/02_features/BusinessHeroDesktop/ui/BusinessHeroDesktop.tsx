import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import { BusinessActionsBar } from '../../BusinessActionsBar/ui/BusinessActionsBar';
import Link from 'next/link';
import { AppBreadcrumbs } from '@/layers/04_shared/ui/AppBreadcrumbs';
import type { Business } from '@/layers/04_shared/types/types';
import { ShareButtonWithMenu } from '../../ShareButton/ShareButtonWithMenu';

interface BusinessHeroDesktopProps {
  data?: Business;
}

export const BusinessHeroDesktop: React.FC<BusinessHeroDesktopProps> = ({
  data,
}) => {
  const {
    name,
    category,
    description,
    average_rating,
    approved_reviews_count,
    coordinates,
    images,
    phone,
    website,
    address,
    slug,
  } = data!;
  const imageUrl = images[0]?.url ?? '/business.jpg';

  const BREADCRUMBS = [
    { label: 'Home', href: '/' },
    { label: category.name, href: '/category/' + category.slug },
    { label: name },
  ];

  return (
    <Box display={{ xs: 'none', md: 'block' }}>
      <AppBreadcrumbs items={BREADCRUMBS} />
      <Box
        sx={{
          position: 'relative',
          height: 500,
          color: 'brandAccent.contrastText',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url("${imageUrl}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1,
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to top, #000 0%, transparent 75%)',
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '2rem',
            right: '4rem',
            display: 'flex',
            gap: 1,
            zIndex: 3,
          }}
        >
          <ShareButtonWithMenu companyName={name} />
        </Box>

        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            p: '2rem 4rem',
            zIndex: 2,
            maxWidth: 'lg',
            mx: 'auto',
          }}
        >
          <Button
            variant="contained"
            size="small"
            sx={{
              bgcolor: 'brandAccent.main',
              color: 'brandAccent.contrastText',
              textTransform: 'none',
              fontWeight: 'bold',
              mb: 1,
              '&:hover': { bgcolor: 'statusError.dark' },
            }}
          >
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
          </Button>

          {approved_reviews_count > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <StarIcon
                sx={{ color: 'secondary.main', fontSize: 20, mr: 0.5 }}
              />
              <Typography variant="h6" fontWeight="bold" sx={{ mr: 1 }}>
                {average_rating}
              </Typography>

              <Typography variant="body1" color="grey.400">
                (total reviews: {approved_reviews_count})
              </Typography>
            </Box>
          )}

          <Typography
            variant="h3"
            component="h1"
            color="brandAccent.contrastText"
            gutterBottom
          >
            {name}
          </Typography>
          <Typography
            variant="body1"
            color="brandAccent.contrastText"
            mb={'1rem'}
          >
            {description}
          </Typography>
        </Box>
      </Box>
      <BusinessActionsBar
        phone={phone}
        website={website}
        address={address}
        lat={coordinates.lat}
        lon={coordinates.lon}
        slug={slug}
      />
    </Box>
  );
};
