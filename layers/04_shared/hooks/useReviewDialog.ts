import { useState } from 'react';
import { useCurrentLanguage } from './useCurrentLanguage';
import { ReviewFormData } from '../types/types';

export const useReviewDialog = (slug?: string) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const currentLang = useCurrentLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleSubmitReview = async (formData: ReviewFormData) => {
    if (!slug) return;

    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch(
        `https://api.milanplaces.com/api/v1/companies/${slug}/reviews`,
        {
          method: 'POST',
          headers: {
            'Accept-Language': currentLang,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            review: {
              name: formData.name,
              email: formData.email,
              rating: formData.rating,
              comment_translations: {
                [currentLang]: formData.comment,
              },
            },
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setIsDialogOpen(false);
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error submitting review', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const closeSnackbar = () => setSnackbarOpen(false);

  return {
    // dialog state
    isDialogOpen,
    handleOpenDialog,
    handleCloseDialog,

    // mutation
    handleSubmitReview,
    isLoading,
    isError,

    // snackbar
    snackbarOpen,
    closeSnackbar,
  };
};
