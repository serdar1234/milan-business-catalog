'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { Insight } from '@/layers/04_shared/types/types';
import { formatRelativeTime } from '@/layers/04_shared/utils/formatRelativeTime';
import { useCurrentLanguage } from '@/layers/04_shared/hooks/useCurrentLanguage';
import Link from 'next/link';

interface InsightCardProps {
  insight: Insight;
  isDesktop?: boolean;
}

export const InsightCard: React.FC<InsightCardProps> = ({
  insight,
  isDesktop = false,
}) => {
  const lang = useCurrentLanguage();
  const { name, rating, comment, created_at, company } = insight;
  const timeAgo = formatRelativeTime(created_at, lang);

  const MobileHeader = (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body1" fontWeight="bold" color="text.primary">
          {name}
        </Typography>
      </Box>
    </Box>
  );

  const DesktopHeader = (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Typography variant="body1" fontWeight="bold" color="text.primary">
          {name}
        </Typography>
        <Rating
          value={rating}
          readOnly
          size="small"
          sx={{ color: 'brandPin.main' }}
        />
        <Typography variant="body2" color="text.secondary">
          {timeAgo}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Card
      sx={{ mb: isDesktop ? 0 : 2, boxShadow: 1, bgcolor: 'background.paper' }}
    >
      <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <Avatar
            src={''}
            alt={name}
            sx={{
              width: isDesktop ? 48 : 48,
              height: isDesktop ? 48 : 48,
              mr: 2,
            }}
          />
          {isDesktop ? DesktopHeader : MobileHeader}
        </Box>
        <Typography variant="body1" sx={{ mb: 1.5 }}>
          &quot;{comment}&quot;
        </Typography>
        {isDesktop ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'text.secondary',
              mt: 2,
            }}
          >
            {company?.slug && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <PlaceOutlinedIcon
                  sx={{ color: 'brandPin.main', fontSize: 18, mr: 0.5 }}
                />
                <Link href={`/business/${company.slug}`}>
                  <Typography variant="body2" color="text.secondary">
                    Visited {company.name}
                  </Typography>
                </Link>
              </Box>
            )}
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'text.secondary',
            }}
          >
            <Rating
              value={rating || 0}
              readOnly
              size="small"
              sx={{ color: 'brandPin.main', mr: 1 }}
            />
            <Typography variant="caption" fontWeight="medium">
              {timeAgo}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
