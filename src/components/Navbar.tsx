import { Link } from 'react-router-dom';
import { Button, Dropdown, Label } from '@heroui/react';
import { MenuList } from './MenuList';
import { navItems } from '../config/site';
import { useI18n } from '../i18n';
import { useTheme } from '../theme';
import { Globe } from '@gravity-ui/icons';
import { BottomNav } from './BottomNav';

function Navbar() {
  const { locale, setLocale, t } = useI18n();
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    if (newTheme === theme) return;

    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    document.startViewTransition(() => {
      setTheme(newTheme);
    });
  };

  return (
    <nav className="bg-gray-800 dark:bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">HeroUI3</Link>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-4 hidden sm:flex">
            {navItems.map((item) => (
              <Link key={item.url} to={item.url} className="hover:underline">
                {t(`nav.${item.label.toLowerCase()}`)}
              </Link>
            ))}
          </div>

          <Dropdown>
            <Button aria-label="Theme" variant="secondary" size="sm" isIconOnly>
              {theme === 'dark' ? '🌙' : '☀️'}
            </Button>
            <Dropdown.Popover>
              <Dropdown.Menu onAction={(key) => handleThemeChange(key as 'light' | 'dark')}>
                <Dropdown.Item id="light" textValue="Light">
                  <Label>☀️ {t(`theme.light`)}</Label>
                </Dropdown.Item>
                <Dropdown.Item id="dark" textValue="Dark">
                  <Label>🌙 {t(`theme.dark`)}</Label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>

          <Dropdown>
            <Button aria-label="Language" variant="secondary" size="sm" isIconOnly>
              <Globe/>
            </Button>
            <Dropdown.Popover>
              <Dropdown.Menu onAction={(key) => setLocale(key as 'en' | 'zh')}>
                <Dropdown.Item id="en" textValue="English">
                  <Label>English</Label>
                </Dropdown.Item>
                <Dropdown.Item id="zh" textValue="中文">
                  <Label>中文</Label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>

          <MenuList/>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
