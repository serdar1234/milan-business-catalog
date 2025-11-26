import { HourEntry } from '@/layers/04_shared/api/mocks/businessDetailsMocks';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Typography } from '@mui/material';
import { DAYS } from '@/layers/04_shared/utils/constants';

const ScheduleRow: React.FC<HourEntry> = ({ hours, id }) => {
  const today = new Date().getDay();
  const isToday = id === today;
  const day = DAYS[id];
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        py: 1.5,
        borderBottom: '1px solid var(--color-border-grey)',
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

      <Typography
        variant="body1"
        sx={{
          color: isToday ? 'brandAccent.main' : 'text.secondary',
          fontWeight: isToday ? 'bold' : 'normal',
        }}
      >
        {hours}
      </Typography>
    </Box>
  );
};
export const HoursSection: React.FC<{ hours: HourEntry[] }> = ({ hours }) => {
  const today = new Date().getDay();
  const todayHours = hours.find((h) => h.id === today)!;
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
          <ScheduleRow key={`row-${DAYS[entry.id]}`} {...entry} />
        ))}
      </Box>

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
