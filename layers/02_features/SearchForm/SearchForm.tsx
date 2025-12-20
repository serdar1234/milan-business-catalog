'use client';

import {
  FormEvent,
  useState,
  useCallback,
  useMemo,
  useTransition,
  useEffect,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

import { addRecentSearch } from '@/layers/03_entities/search/model/slice';
import {
  AutocompleteResult,
  useGetAutocompleteSuggestionsQuery,
} from '@/layers/03_entities/autocomplete/api';

import { useDebounce } from '@/layers/04_shared/hooks/useDebounce';
import { useCurrentLanguage } from '@/layers/04_shared/hooks/useCurrentLanguage';
import { SearchOptionItem } from '@/layers/04_shared/ui/SearchOptionItem';
import { SearchInput } from '@/layers/04_shared/ui/SearchInput';
import style from './SearchForm.module.css';

export const SearchForm: React.FC<{
  hasBorder?: boolean;
  handleDrawerClose?: () => void;
}> = ({ hasBorder = false, handleDrawerClose }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const dispatch = useDispatch();

  const [query, setQuery] = useState('');

  const [selectedOption, setSelectedOption] =
    useState<AutocompleteResult | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery('');
    setSelectedOption(null);
  }, [pathname]);
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
      const matchedOption = localOptions.find(
        (opt) =>
          opt.name.trim().toLowerCase() === searchValue.trim().toLowerCase(),
      );

      if (matchedOption) {
        startTransition(() => {
          router.push(`/business/${matchedOption.slug}`);
        });
        setQuery('');
        setSelectedOption(null);
        handleDrawerClose?.();
        dispatch(
          addRecentSearch({
            value: matchedOption.name,
            slug: matchedOption.slug,
          }),
        );
      } else {
        startTransition(() => {
          router.push(`/search?q=${encodeURIComponent(searchValue)}`);
        });
        setQuery('');
        setSelectedOption(null);
        handleDrawerClose?.();
        dispatch(addRecentSearch({ value: searchValue, slug: '' }));
      }
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
      startTransition(() => {
        router.push(`/business/${newValue.slug}`);
      });
      dispatch(addRecentSearch({ value: newValue.name, slug: newValue.slug }));

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
          <SearchInput {...params} isLoading={isPending} />
        )}
        renderOption={(props, option) => (
          <SearchOptionItem props={props} option={option} key={option.id} />
        )}
      />
    </Box>
  );
};
