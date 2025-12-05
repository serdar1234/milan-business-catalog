import { formatDistanceToNow, Locale, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import { it } from 'date-fns/locale/it';
import { es } from 'date-fns/locale/es';
import { sk } from 'date-fns/locale/sk';

const localeMap: Record<string, Locale> = {
  en: enUS,
  it: it,
  es: es,
  sk: sk,
};

/**
 * Transforms ISO-string to relative time ("21 day ago").
 * @param dateString "YYYY-MM-DDTHH:mm:ssZ"
 * @param lang lang code ('en', 'it', 'es', 'sk')
 * @returns relative time
 */
export const formatRelativeTime = (
  dateString: string,
  lang: string,
): string => {
  try {
    const date = parseISO(dateString);
    const locale = localeMap[lang] || enUS;

    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: locale,
    });
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return dateString;
  }
};
