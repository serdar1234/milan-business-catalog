import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const InfoRow: React.FC<{
  icon: React.ElementType;
  title?: string;
  content: string;
  isLink?: boolean;
}> = ({ icon: Icon, title, content, isLink }) => {
  let linkText: string = '';
  if (isLink) {
    if (title === 'Website') linkText = 'https://' + content;
    else if (title === 'Phone') linkText = 'tel:' + content;
    else if (title === 'Email') linkText = 'mailto:' + content;
  }
  console.log('linkText', content, linkText);
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
      <Icon sx={{ color: 'brandAccent.main', mr: 2, mt: 0.25, fontSize: 24 }} />
      <Box>
        <Typography
          variant="body1"
          component={isLink ? 'a' : 'span'}
          href={isLink ? (linkText as string) : undefined}
          target={isLink ? '_blank' : undefined}
          sx={{
            cursor: isLink ? 'pointer' : 'default',
            whiteSpace: 'pre-line',
          }}
          title={content}
        >
          {content}
        </Typography>
      </Box>
    </Box>
  );
};
