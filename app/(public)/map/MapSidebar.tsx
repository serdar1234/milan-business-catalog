'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Business } from '@/layers/04_shared/types/types';
import { Spinner } from '@/layers/04_shared/ui/Spinner';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import Grid from '@mui/material/Grid';
import { InfoRow } from '@/layers/04_shared/ui/InfoRow';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import Image from 'next/image';

interface MapSidebarProps {
  business?: Business | null;
  isSearching?: boolean;
}

export default function MapSidebar({ business, isSearching }: MapSidebarProps) {
  if (isSearching) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <Spinner bgcolor="transparent" />
      </Box>
    );
  }

  if (!business) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Welcome to the Map
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Select a marker on the map to see business details.
        </Typography>
      </Box>
    );
  }

  const {
    name,
    phone,
    website,
    address,
    email,
    description,
    category,
    average_rating,
    approved_reviews_count,
    ratings_breakdown,
    images,
  } = business;

  return (
    <Grid container spacing={0} mb={5}>
      {/* --- БЛОК 1: Основная инфо (Заголовок) --- */}
      <Grid size={12} sx={{ p: 2, pb: 1 }}>
        <Chip
          label={category?.name}
          size="small"
          color="brandAccent"
          sx={{ mb: 1, fontWeight: 'bold', float: { xs: 'none', sm: 'right' } }}
        />
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: 'bold', mb: 0.5 }}
        >
          {name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Rating
            value={average_rating}
            readOnly
            precision={0.1}
            size="small"
          />
          <Typography variant="body2" fontWeight="bold">
            {average_rating}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ({approved_reviews_count} reviews)
          </Typography>
        </Box>
      </Grid>

      {/* --- БЛОК 2: Изображение (Мини-галерея) --- */}
      <Grid size={{ xs: 12, sm: 6, md: 12 }} sx={{ p: 2 }}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 200,
            borderRadius: 2,
            overflow: 'hidden',
            bgcolor: 'grey.100',
          }}
        >
          <Image
            src={images?.[0]?.url || '/images/placeholder.svg'}
            alt={name || 'Business'}
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>
      </Grid>

      {/* --- БЛОК 3: Описание --- */}
      <Grid size={{ xs: 12, sm: 6, md: 12 }} sx={{ p: 2 }}>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ textTransform: 'uppercase', mb: 1, fontWeight: 'bold' }}
        >
          About
        </Typography>
        <Typography
          variant="body2"
          sx={{ lineHeight: 1.6, color: 'text.primary' }}
        >
          {description}
        </Typography>
      </Grid>

      <Divider
        sx={{
          width: '100%',
          my: 1,
          display: { xs: 'block', sm: 'none', md: 'block' },
        }}
      />

      {/* --- БЛОК 4: Контакты --- */}
      <Grid size={{ xs: 12, sm: 6, md: 12 }} sx={{ p: 2 }}>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ textTransform: 'uppercase', mb: 1, fontWeight: 'bold' }}
        >
          Contact Info
        </Typography>
        {address && (
          <InfoRow title={address} icon={LocationOnIcon} content={address} />
        )}
        {phone && (
          <InfoRow title="Phone" icon={PhoneIcon} content={phone} isLink />
        )}
        {website && (
          <InfoRow
            title="Website"
            icon={LanguageIcon}
            content={website}
            isLink
          />
        )}
        {email && (
          <InfoRow title="Email" icon={EmailIcon} content={email} isLink />
        )}
      </Grid>

      {/* --- БЛОК 5: Детализация рейтинга --- */}
      <Grid size={{ xs: 12, sm: 6, md: 12 }} sx={{ p: 2 }}>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ textTransform: 'uppercase', mb: 2, fontWeight: 'bold' }}
        >
          Ratings Breakdown
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {ratings_breakdown
            ?.slice()
            .reverse()
            .map((item) => (
              <Box
                key={item.stars}
                sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
              >
                <Typography
                  variant="caption"
                  sx={{ minWidth: 45, fontWeight: 'bold' }}
                >
                  {item.stars} stars
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={item.percentage}
                  sx={{
                    flexGrow: 1,
                    height: 8,
                    borderRadius: 5,
                    bgcolor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      bgcolor:
                        item.percentage > 0 ? 'brandPin.main' : 'grey.300',
                    },
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    minWidth: 30,
                    textAlign: 'right',
                    color: 'text.secondary',
                  }}
                >
                  {item.count}
                </Typography>
              </Box>
            ))}
        </Box>
      </Grid>
    </Grid>
  );
}
