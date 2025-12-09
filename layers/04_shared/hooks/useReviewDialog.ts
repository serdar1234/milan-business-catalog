import { useState } from 'react';
import { useCurrentLanguage } from './useCurrentLanguage';
import { useSubmitReviewMutation } from '@/layers/03_entities/business/businessApi';
import { ReviewFormData } from '../types/types';

export const useReviewDialog = (slug?: string) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const currentLang = useCurrentLanguage();
  const [submitReview, { isLoading, isError }] = useSubmitReviewMutation();

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleSubmitReview = async (formData: ReviewFormData) => {
    if (!slug) return;
    try {
      await submitReview({
        slug,
        formData,
        lang: currentLang,
      }).unwrap();

      setIsDialogOpen(false);
      setSnackbarOpen(true);
    } catch (e) {
      console.error('Error submitting review', e);
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
