import { Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

export const FeatureList: React.FC<{
  title: string;
  items: { label: string }[];
}> = ({ title, items }) => (
  <Box>
    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1.5 }}>
      {title}
    </Typography>
    {items.map((item, index) => (
      <Box
        key={index}
        sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}
      >
        <CheckIcon
          sx={{ color: 'brandAccent.main', mr: 1, fontSize: 20, mt: '3px' }}
        />
        <Typography variant="body1" color="text.primary">
          {item.label}
        </Typography>
      </Box>
    ))}
  </Box>
);
