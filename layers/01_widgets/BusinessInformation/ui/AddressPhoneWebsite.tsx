import Link from 'next/link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import { InfoRow } from '../../../04_shared/ui/InfoRow';
import { Business } from '@/layers/04_shared/types/types';

export default function AddressPhoneWebsite({ data }: { data?: Business }) {
  return (
    <Grid size={12} aria-label="Business Contact Information">
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
        <LocationOnIcon
          sx={{ color: 'brandAccent.main', mr: 2, mt: 0.25, fontSize: 24 }}
        />
        {data?.address && (
          <Box>
            <Typography variant="body1" fontWeight="bold" color="text.primary">
              Address
            </Typography>
            <Link
              href={
                data?.coordinates.lat
                  ? `/map?lat=${data?.coordinates.lat}&lon=${data?.coordinates.lon}&slug=${data?.slug}`
                  : ''
              }
            >
              {data?.address}
            </Link>
          </Box>
        )}
      </Box>
      <InfoRow
        icon={PhoneIcon}
        title="Phone"
        content={data?.phone || ''}
        isLink
      />
      <InfoRow
        icon={LanguageIcon}
        title="Website"
        content={data?.website || ''}
        isLink
      />
    </Grid>
  );
}
