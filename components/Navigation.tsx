import { useTranslations } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';
import NavigationLink from './NavigationLink';

export default function Navigation() {
  const t = useTranslations('Navigation');

  return (
    <nav className="flex w-full justify-between items-center text-white">
      <div>
        <NavigationLink href="/">{t('home')}</NavigationLink>
        <NavigationLink href="/characters">{t('characters')}</NavigationLink>
        <NavigationLink href="/equipment">{t('equipment')}</NavigationLink>
        <NavigationLink href="/code">{t('code')}</NavigationLink>
      </div>
      <LocaleSwitcher />
    </nav>
  );
}