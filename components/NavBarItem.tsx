import { usePathname } from 'next/navigation';

const NavBarItem = ({ children, href, className, tabIndex, testId }: any) => {
  const pathname = usePathname();
  const activeClass = 'navbar-item-active';
  const activeClasses = className ? `${className} ${activeClass}` : activeClass;

  return (
    <span className='d-inline-flex align-items-center navbar-item'>
      <span
        className={pathname === href ? activeClasses : className}
        tabIndex={tabIndex}
        data-testid={testId}
      >
        {children}
      </span>
    </span>
  );
};

export default NavBarItem;
