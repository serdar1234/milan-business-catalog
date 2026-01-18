import { Box, Skeleton, Container } from '@mui/material';
import { LoadingSkeletonProps } from './types';

export const LoadingSkeleton = ({ viewType }: LoadingSkeletonProps) => {
  if (viewType === 'mobile') {
    return (
      <Container sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box
          sx={{
            backgroundImage:
              'linear-gradient(45deg, var(--color-brand-primary), var(--color-text-primary))',
            p: 3,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 2,
            }}
          >
            <Box>
              <Skeleton
                variant="text"
                width={150}
                height={30}
                sx={{ bgcolor: 'rgba(255,255,255,0.3)' }}
              />
              <Skeleton
                variant="text"
                width={200}
                height={20}
                sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}
              />
            </Box>
            <Skeleton
              variant="rectangular"
              width={100}
              height={48}
              sx={{ bgcolor: 'rgba(255,255,255,0.3)', ml: 4 }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              py: 1,
              flexWrap: 'wrap',
            }}
          >
            {[...Array(4)].map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                width={60}
                height={30}
                sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Box display={{ xs: 'none', md: 'block' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          minHeight: 700,
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 4,
        }}
      >
        {/* left column */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            p: 3,
            borderRight: '1px solid var(--color-border-grey)',
          }}
        >
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} variant="rounded" width={60} height={36} />
            ))}
          </Box>

          <Skeleton variant="rectangular" height={48} sx={{ mb: 2 }} />

          {[...Array(3)].map((_, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Skeleton variant="rectangular" height={80} />
            </Box>
          ))}

          <Skeleton variant="rectangular" height={60} />
        </Box>

        <Box
          sx={{
            bgcolor: 'secondary.light',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Skeleton variant="rectangular" width="100%" height="100%" />
        </Box>
      </Box>
    </Box>
  );
};
