import {
  Box,
  Typography,
  Avatar,
  Chip,
  Card,
  CardContent,
  Rating,
} from '@mui/material';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

type UserLabel = 'Verified' | 'Tourist';

interface Insight {
  id: number;
  user: string;
  avatarUrl: string;
  text: string;
  timeAgo: string;
  rating: number;
  locationText?: string;

  label?: UserLabel;
  likes?: number;
}

interface InsightCardProps {
  insight: Insight;
  isDesktop?: boolean;
}

export const InsightCard: React.FC<InsightCardProps> = ({
  insight,
  isDesktop = false,
}) => {
  const { user, avatarUrl, text, timeAgo, rating, locationText, label, likes } =
    insight;

  let chipColor: 'statusFeatured' | 'brandAccent' = 'brandAccent';
  if (label !== 'Verified') {
    chipColor = 'statusFeatured';
  }

  const MobileHeader = (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body1" fontWeight="bold" color="text.primary">
          {user}
        </Typography>
        {label && (
          <Chip
            label={label}
            size="small"
            color={chipColor}
            sx={{ height: 20, fontWeight: 'medium', color: 'white' }}
          />
        )}
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
          {user}
        </Typography>
        <Rating
          value={rating}
          readOnly
          size="small"
          sx={{ color: 'brandPin.main' }}
        />
        <Typography variant="body2" color="text.secondary">
          {timeAgo} ago
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
            src={avatarUrl}
            alt={user}
            sx={{
              width: isDesktop ? 48 : 48,
              height: isDesktop ? 48 : 48,
              mr: 2,
            }}
          />
          {isDesktop ? DesktopHeader : MobileHeader}
        </Box>
        <Typography variant="body1" sx={{ mb: 1.5 }}>
          &quot;{text}&quot;
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
            {locationText && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PlaceOutlinedIcon
                  sx={{ color: 'brandPin.main', fontSize: 18, mr: 0.5 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Visited {locationText}
                </Typography>
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
            <Typography variant="caption" fontWeight="medium" sx={{ mr: 2 }}>
              {likes} likes
            </Typography>
            <Typography variant="caption" fontWeight="medium">
              • {timeAgo} ago
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
