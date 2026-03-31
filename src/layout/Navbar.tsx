import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Label } from '@heroui/react';
import { MenuList } from '../components/MenuList';
import { navItems, siteConfig } from '../config/site';
import { useI18n } from '../i18n';
import { Bars, Globe, House, Xmark,  } from '@gravity-ui/icons';

function Sidebar() {
  const { setLocale, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 移动端菜单按钮 */}
      <div className="sm:hidden fixed top-4 left-4 z-50">
        <Button 
          isIconOnly 
          variant="ghost" 
          onPress={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <Xmark /> : <Bars />}
        </Button>
      </div>

      {/* 侧边栏主体 */}
      <aside className={`
        fixed top-0 left-0 h-full w-50 bg-white/90 dark:bg-black/90 backdrop-blur-sm shadow-xl
        transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        sm:translate-x-0
      `}>
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold libre mb-8">
            {siteConfig.name}
          </Link>

          {/* 导航链接 */}
          <nav className="flex-1 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.url}
                to={item.url}
                className="block py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="inline-block mr-2 w-4 h-4" />
                  {t(`nav.${item.label?.toLowerCase()}`)}
                </div>
              </Link>
            ))}
          </nav>

          <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">

            <Dropdown>
              <Button 
                aria-label="Language" 
                variant="secondary" 
                size="sm" 
                className="w-full justify-start"
              >
                <Globe className="mr-2" />
                {t('common.language')}
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

            <MenuList />
          </div>
        </div>
      </aside>

    </>
  );
}

export default Sidebar;
