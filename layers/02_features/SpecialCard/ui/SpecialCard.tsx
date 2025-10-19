import { Box, Typography, Button, Chip } from '@mui/material';
import Link from 'next/link';
import styles from './SpecialCard.module.css';

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export interface SpecialCardProps {
  title: string;
  subtitle: string;
  link: string;
  bgColor: string;
  isLarge?: boolean;
  chipLabel?: string;
  icon?: React.ElementType;
  date?: string;
  location?: string;
  buttonText?: string;
}

export const SpecialCard: React.FC<SpecialCardProps> = ({
  title,
  subtitle,
  link,
  bgColor,
  isLarge = false,
  chipLabel,
  icon: IconComponent,
  date,
  location,
  buttonText = isLarge ? 'View Details' : undefined,
}) => {
  const textColor =
    bgColor === 'var(--color-background)' ? 'text.primary' : 'background.paper';
  const subTextColor =
    bgColor === 'var(--color-background)'
      ? 'text.secondary'
      : 'background.paper';
  const isCardLink = !buttonText;

  return (
    <Box
      className={styles.card}
      sx={{
        height: isLarge ? 280 : 'auto',
        backgroundImage: isLarge
          ? `linear-gradient(to right, ${bgColor}, hsl(from ${bgColor} h s 25%))`
          : '',
        bgcolor: isLarge ? 'transparent' : bgColor,
        boxShadow: 4,
        p: 3,
        pr: isLarge ? 5 : 3,
        '&:hover': {
          boxShadow: 8,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          mb: 1,
        }}
      >
        {chipLabel && (
          <Chip
            label={chipLabel}
            size="small"
            sx={{
              color: 'background.paper',
              bgcolor: 'rgb(255 255 255 / 0.2)',
              fontWeight: 'medium',
            }}
          />
        )}
        {IconComponent && !isLarge && (
          <IconComponent sx={{ fontSize: 28, color: `brandAccent.main` }} />
        )}
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant={isLarge ? 'h5' : 'h6'}
          fontWeight="bold"
          color={textColor}
          component="div"
          sx={{ mb: 1 }}
        >
          {title}
        </Typography>

        <Typography variant="body2" color={subTextColor}>
          {subtitle}
        </Typography>
      </Box>

      {/* data and location and button */}
      <Box
        sx={{
          width: '100%',
          height: 48,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {(date || location) && (
          <Box sx={{ mt: 2, mb: 2 }}>
            {date && (
              <Box
                sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}
                component={isCardLink ? Link : 'div'}
                {...(isCardLink && { href: link })}
              >
                <CalendarTodayIcon
                  sx={{
                    fontSize: 16,
                    color: isLarge ? subTextColor : 'brandAccent.main',
                    mr: 1,
                  }}
                />
                <Typography
                  variant="body2"
                  color={isLarge ? subTextColor : 'brandAccent.main'}
                >
                  {date}
                </Typography>
              </Box>
            )}
            {location && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PlaceOutlinedIcon
                  sx={{ fontSize: 16, color: subTextColor, mr: 1 }}
                />
                <Typography variant="body2" color={subTextColor}>
                  {location}
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {isLarge && (
          <Button
            component={Link}
            href={link}
            variant="contained"
            color="surface"
            endIcon={<ArrowForwardIcon />}
            sx={{
              fontWeight: 'bold',
              color: bgColor,
              '&:hover': {
                bgcolor: 'background.paper',
              },
            }}
          >
            {buttonText}
          </Button>
        )}
      </Box>
    </Box>
  );
};
