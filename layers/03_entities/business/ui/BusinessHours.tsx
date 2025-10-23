import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Typography } from '@mui/material';

export interface HourEntry {
  day: string;
  hours: string;
  isToday: boolean;
}

const ScheduleRow: React.FC<HourEntry> = ({ day, hours, isToday }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      py: 1.5,
      borderBottom: '1px solid',
      borderColor: 'divider',
    }}
  >
    <Typography
      variant="body1"
      sx={{
        color: isToday ? 'brandAccent.main' : 'text.primary',
        fontWeight: isToday ? 'bold' : 'normal',
      }}
    >
      {day}
    </Typography>

    <Typography variant="body1" color="text.secondary">
      {hours}
    </Typography>
  </Box>
);

export const HoursSection: React.FC<{ hours: HourEntry[] }> = ({ hours }) => {
  const todayHours = hours.find((h) => h.isToday) || hours[0];
  const isOpen = todayHours.hours !== 'Closed';
  const statusText = isOpen
    ? `Open Now • Closes at ${todayHours.hours.split(',').pop()?.trim().split(' - ').pop()}`
    : `Closed Today`;
  const statusColor = isOpen ? 'success' : 'statusError';
  const IconComponent = isOpen ? CheckCircleOutlineIcon : AccessTimeIcon;

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        {hours.map((entry) => (
          <ScheduleRow key={entry.day} {...entry} />
        ))}
      </Box>

      {/* Current Status */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          p: 2,
          borderRadius: 2,
          border: `1px solid`,
          borderColor: `${statusColor}.contrastText`,
          bgcolor: `${statusColor}.light`,
        }}
      >
        <IconComponent
          sx={{ color: `${statusColor}.main`, mr: 1, fontSize: 24 }}
        />
        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{ color: `${statusColor}.dark` }}
        >
          {statusText}
        </Typography>
      </Box>
    </Box>
  );
};
