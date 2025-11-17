'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation'; // 🚨 Импорты для работы с URL
import FilterSection from '@/layers/04_shared/ui/FilterSection';
import {
  Box,
  Typography,
  Slider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Checkbox,
  Button,
} from '@mui/material';
import {
  MAX_RADIUS,
  PRICE_OPTIONS,
  ATMOSPHERE_OPTIONS,
  FEATURE_OPTIONS,
} from '@/layers/04_shared/api/mocks/filterMocks';

export default function Filters({
  setOpen,
}: {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. --- Хелпер для управления параметрами URL ---
  const createQueryString = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value.length > 0) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    return params.toString();
  };

  const navigateToNewURL = (key: string, value: string | null) => {
    const newQueryString = createQueryString(key, value);
    router.push(`${pathname}?${newQueryString}`, { scroll: false });
  };

  // 2. --- Чтение текущего состояния из URL ---

  // Радиус (number, но хранится как string в URL)
  const radius = parseFloat(searchParams.get('radius') || String(MAX_RADIUS));

  // Ценовой диапазон (string или null)
  const priceRange = searchParams.get('priceRange') || null;

  // Atmosphere (multiple: 'a,b,c')
  const atmosphere = searchParams.get('atmosphere')?.split(',') || [];

  // Features (multiple: 'a,b,c')
  const features = searchParams.get('features')?.split(',') || [];

  // 3. --- Обработчики изменений ---

  const handleRadiusChange = (event: Event, newValue: number | number[]) => {
    // В отличие от Redux, здесь мы не обновляем локальный стейт, а сразу меняем URL.
    // NOTE: Мы используем Slider, который изменяется "вживую".
    // Обычно для живого изменения Slider используют локальный стейт,
    // а URL обновляют по отпусканию (onChangeCommitted), но здесь для простоты обновляем сразу.
    navigateToNewURL('radius', String(newValue));
  };

  // NOTE: Для PriceRange (Radio) мы используем ту же логику Toggle, что и раньше.
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = event.target.value;
    // Если выбирается тот же самый фильтр, сбрасываем его (устанавливаем null)
    const finalPrice = newPrice === priceRange ? null : newPrice;
    navigateToNewURL('priceRange', finalPrice);
  };

  // NOTE: Для Checkbox (multiple)
  const handleCheckboxChange = (
    key: 'atmosphere' | 'features',
    value: string,
  ) => {
    const currentList =
      searchParams
        .get(key)
        ?.split(',')
        .filter((v) => v) || [];

    const newList = currentList.includes(value)
      ? currentList.filter((item) => item !== value)
      : [...currentList, value];

    // Объединяем массив обратно в строку для URL
    navigateToNewURL(key, newList.join(','));
  };

  // 4. --- Кнопки действий ---

  const handleCancel = () => {
    // При URL-параметрах, для отмены нужно вернуться к предыдущему URL (если это Drawer)
    // Или просто закрыть Drawer, оставив текущие изменения, которые были сделаны "вживую"
    if (setOpen) setOpen(false);
  };

  // NOTE: Сброс фильтров
  function handleReset() {
    const params = new URLSearchParams(searchParams.toString());

    // Сохраняем только основной запрос 'q' и 'view'
    const q = params.get('q');
    const view = params.get('view');

    // Удаляем все фильтры
    params.delete('radius');
    params.delete('priceRange');
    params.delete('atmosphere');
    params.delete('features');
    // ... любые другие фильтры

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <>
      {/* Radius */}
      <FilterSection title="Distance">
        <Box sx={{ p: 1 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="text.primary"
            sx={{ fontFamily: (theme) => theme.typography.fontFamily }}
          >
            {radius} km
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Shows businesses within this distance from your location
          </Typography>
          <Slider
            value={radius} // 🚨 Читаем из URL
            onChange={handleRadiusChange}
            min={1}
            max={MAX_RADIUS}
            step={1}
            // ... (стили) ...
          />
        </Box>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <FormControl component="fieldset">
          <RadioGroup
            value={priceRange} // 🚨 Читаем из URL
            onChange={handlePriceChange}
            row
            sx={{ gap: 1, flexWrap: 'nowrap' }}
          >
            {PRICE_OPTIONS.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={
                  <Radio
                    size="small"
                    checked={priceRange === option.value} // 🚨 Проверяем по URL
                    sx={{ display: 'none' }}
                  />
                }
                label={
                  <Box
                    sx={{
                      // ... (стили для активного/неактивного состояния)
                      bgcolor:
                        priceRange === option.value
                          ? 'brandAccent.main'
                          : 'background.paper',
                      color:
                        priceRange === option.value
                          ? 'white'
                          : 'brandAccent.main',
                      borderColor:
                        priceRange === option.value
                          ? 'brandAccent.main'
                          : '#E0E0E0',
                      // ... (остальные стили)
                    }}
                  >
                    {option.label}
                  </Box>
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
      </FilterSection>

      {/* Atmosphere */}
      <FilterSection title="Atmosphere">
        <Stack direction="column" spacing={0}>
          {ATMOSPHERE_OPTIONS.map((label) => (
            <FormControlLabel
              key={label}
              control={
                <Checkbox
                  size="small"
                  checked={atmosphere.includes(label)} // 🚨 Проверяем по URL
                  onChange={() => handleCheckboxChange('atmosphere', label)}
                />
              }
              label={<Typography variant="body2">{label}</Typography>}
            />
          ))}
        </Stack>
      </FilterSection>

      {/* Features */}
      <FilterSection title="Features">
        <Stack direction="column" spacing={0}>
          {FEATURE_OPTIONS.map((label) => (
            <FormControlLabel
              key={label}
              control={
                <Checkbox
                  size="small"
                  checked={features.includes(label)} // 🚨 Проверяем по URL
                  onChange={() => handleCheckboxChange('features', label)}
                />
              }
              label={<Typography variant="body2">{label}</Typography>}
            />
          ))}
        </Stack>
      </FilterSection>

      {/* Filters buttons */}
      <Box
        sx={{
          p: { xs: 0, md: 2 },
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 1,
        }}
      >
        <Button color="primary" variant="outlined" onClick={handleReset}>
          Reset
        </Button>
        {/* Кнопка Cancel больше не нужна для сброса состояния, только для закрытия */}
        <Button
          color="secondary"
          variant="contained"
          onClick={handleCancel}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          Cancel
        </Button>
        {/* Кнопка Apply также нужна только для закрытия, т.к. изменения уже в URL */}
        {/* <Button
          color="brandPin"
          variant="contained"
          onClick={handleApply}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          Apply filters
        </Button> */}
      </Box>
    </>
  );
}
