import en from './en.json';
import ru from './ru.json';

export type AvailableLocales = 'en' | 'ru';

const translations: Record<AvailableLocales, typeof en> = {
  en,
  ru,
};

export default translations;
