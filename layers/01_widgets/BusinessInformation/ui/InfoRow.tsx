import { Box, Typography } from '@mui/material';

export const InfoRow: React.FC<{
  icon: React.ElementType;
  title: string;
  content: React.ReactNode;
  isLink?: boolean;
}> = ({ icon: Icon, title, content, isLink }) => {
  let linkText: string = '';
  if (isLink) {
    if (title === 'Website') linkText = 'https://' + content;
    else if (title === 'Phone') linkText = 'tel:' + content;
    else if (title === 'Address')
      linkText = `https://maps.google.com/?q=${encodeURIComponent(content as string)}`;
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
      <Icon sx={{ color: 'brandAccent.main', mr: 2, mt: 0.25, fontSize: 24 }} />
      <Box>
        <Typography variant="body1" fontWeight="bold" color="text.primary">
          {title}
        </Typography>
        <Typography
          variant="body1"
          component={isLink ? 'a' : 'span'}
          href={isLink ? (linkText as string) : undefined}
          target={isLink ? '_blank' : undefined}
          sx={{
            cursor: isLink ? 'pointer' : 'default',
            whiteSpace: 'pre-line',
          }}
        >
          {content}
        </Typography>
      </Box>
    </Box>
  );
};
