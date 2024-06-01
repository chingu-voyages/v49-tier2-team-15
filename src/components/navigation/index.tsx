import * as React from 'react';
import { useContext } from 'react';
import {
  FiMoon as DarkIcon,
  FiAperture as GenerateIcon,
  FiHome as HomeIcon,
  FiSun as LightIcon,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from '../ui/navigation-menu';

import { ColorContext } from '@/context/ColorContext';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const { accentColor, isDarkMode, toggleDarkMode } = useContext(ColorContext);

  return (
    <header className="px-2 py-4">
      <NavigationMenu className="max-w-full">
        <NavigationMenuList>
          <ListItem href="/">
            <HomeIcon stroke={accentColor} size={20} />
          </ListItem>
          <ListItem href="/generator">
            <GenerateIcon stroke={accentColor} size={20} />
          </ListItem>
          <ListItem onClick={toggleDarkMode}>
            {isDarkMode ? (
              <DarkIcon stroke={accentColor} size={20} />
            ) : (
              <LightIcon stroke={accentColor} size={20} />
            )}
          </ListItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href!}
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default Navigation;
