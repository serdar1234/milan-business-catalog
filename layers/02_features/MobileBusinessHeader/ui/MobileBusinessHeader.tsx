import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import Link from 'next/link';
import { Business } from '@/layers/04_shared/types/types';

interface MobileBusinessHeaderProps {
  data?: Business;
}

export const MobileBusinessHeader: React.FC<MobileBusinessHeaderProps> = ({
  data,
}) => {
  const { name, category, slug, address, phone, email, website, coordinates } =
    data!;
  const contactItems = [
    {
      icon: PlaceIcon,
      text: address,
      href: `/map?lat=${coordinates.lat}&lon=${coordinates.lon}&slug=${slug}`,
      type: 'address',
    },
    {
      icon: PhoneIcon,
      text: phone,
      href: `tel:${phone.replace(/\s/g, '')}`,
      type: 'phone',
    },
    { icon: EmailIcon, text: email, href: `mailto:${email}`, type: 'email' },
    {
      icon: LanguageIcon,
      text: website.replace('https://', '').replace('http://', ''),
      href: website,
      type: 'website',
    },
  ];

  return (
    <Box
      display={{ xs: 'flex', md: 'none' }}
      sx={{
        flexDirection: 'column',
        py: 3,
      }}
    >
      <Grid
        container
        bgcolor="primary.main"
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          color: 'white',
          p: 3,
          m: '0 1rem 1rem 1rem',
          maxHeight: 300,
          borderRadius: 3,
          boxShadow: 3,
          flexGrow: 1,
          alignItems: 'flex-start',
        }}
      >
        <Typography
          variant="h5"
          component={'h1'}
          fontWeight="bold"
          lineHeight={1.2}
          sx={{ mb: 1 }}
        >
          {name}
        </Typography>
        <Typography variant="body2" color="surface" sx={{ mb: 1 }}>
          <Link href={`/category/${category.slug}`}>{category.name}</Link>
        </Typography>
      </Grid>
      <List>
        {contactItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <ListItem disablePadding key={index}>
              <ListItemButton>
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    mt: 0.5,
                  }}
                >
                  <IconComponent
                    sx={{ color: 'brandAccent.main', fontSize: 24 }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      sx={{
                        textDecoration: 'none',
                        wordBreak: 'break-word',
                      }}
                      component={item.type === 'address' ? Link : 'a'}
                      href={item.href}
                      target={item.type === 'address' ? '_self' : '_blank'}
                      rel="noopener"
                    >
                      {item.text}
                    </Typography>
                  }
                  sx={{
                    m: 0,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
