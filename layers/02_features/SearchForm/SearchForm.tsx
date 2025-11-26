'use client';

import { FormEvent, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

import { addRecentSearch } from '@/layers/03_entities/search/model/slice';
import {
  AutocompleteResult,
  useGetAutocompleteSuggestionsQuery,
} from '@/layers/03_entities/search/api/searchApi';

import { useDebounce } from '@/layers/04_shared/hooks/useDebounce';
import { useCurrentLanguage } from '@/layers/04_shared/hooks/useCurrentLanguage';
import { SearchOptionItem } from '@/layers/04_shared/ui/SearchOptionItem';
import { SearchInput } from '@/layers/04_shared/ui/SearchInput';
import style from './SearchForm.module.css';

export const SearchForm: React.FC<{
  hasBorder?: boolean;
  handleDrawerClose?: () => void;
}> = ({ hasBorder = false, handleDrawerClose }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<AutocompleteResult | null>(null);

  const currentLang = useCurrentLanguage();
  const debouncedQuery = useDebounce(query, 500);

  const { data: suggestions, isFetching } = useGetAutocompleteSuggestionsQuery(
    {
      q: debouncedQuery,
      limit: 10,
      lang: currentLang,
    },
    { skip: debouncedQuery.trimStart() === '' },
  );

  const localOptions = useMemo(
    () => (query === '' ? [] : (suggestions ?? [])),
    [suggestions, query],
  );

  const runSearch = useCallback(
    (searchValue: string) => {
      setIsLoading(true);

      const matchedOption = localOptions.find(
        (opt) =>
          opt.name.trim().toLowerCase() === searchValue.trim().toLowerCase(),
      );

      if (matchedOption) {
        router.push(`/business/${matchedOption.id}`);
        dispatch(addRecentSearch(matchedOption.name));
      } else {
        const encoded = encodeURIComponent(searchValue);
        router.push(`/search?q=${encoded}`);
        dispatch(addRecentSearch(searchValue));
      }

      setQuery('');
      setSelectedOption(null);
      handleDrawerClose?.();
      setIsLoading(false);
    },
    [router, dispatch, handleDrawerClose, localOptions],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const finalValue = selectedOption?.name || query.trim();
    if (finalValue) runSearch(finalValue);
  };

  const handleAutocompleteChange = (
    _event: React.SyntheticEvent,
    newValue: AutocompleteResult | string | null,
  ) => {
    if (typeof newValue === 'string') {
      const trimmed = newValue.trim();
      if (!trimmed) return;
      setQuery(trimmed);
      return;
    }

    if (newValue) {
      router.push(`/business/${newValue.id}`);
      dispatch(addRecentSearch(newValue.name));

      setQuery('');
      setSelectedOption(null);
      handleDrawerClose?.();
    }
  };

  const handleClose = () => {
    setSelectedOption(null);
    setQuery('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className={style.searchWrapper}
      sx={{
        border: hasBorder ? '1px solid var(--color-brand-accent)' : 'none',
      }}
    >
      <Autocomplete
        fullWidth
        freeSolo
        options={localOptions}
        inputValue={query}
        onInputChange={(_, value) => setQuery(value)}
        onChange={handleAutocompleteChange}
        onClose={handleClose}
        loading={isFetching}
        loadingText="Searching..."
        getOptionLabel={(opt) => (typeof opt === 'string' ? opt : opt.name)}
        isOptionEqualToValue={(a, b) => a.id === b.id}
        renderInput={(params) => (
          <SearchInput {...params} isLoading={isLoading} />
        )}
        renderOption={(props, option) => (
          <SearchOptionItem props={props} option={option} key={option.id} />
        )}
      />
    </Box>
  );
};
