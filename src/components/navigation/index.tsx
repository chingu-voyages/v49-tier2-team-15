import * as React from 'react';
import { Link } from 'react-router-dom';

import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from '../ui/navigation-menu';

import { cn } from '@/lib/utils';

const links = [
  {
    path: '/',
    title: 'Home',
  },
  {
    path: '/generator',
    title: 'Color Generator',
  },
];

const Navigation = () => {
  return (
    <header className="py-4 px-2">
      <NavigationMenu className="max-w-full">
        <NavigationMenuList>
          {links.map((link) => (
            <ListItem key={link.title} title={link.title} href={link.path} />
          ))}
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
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default Navigation;
