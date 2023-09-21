'use client';

import NavBarItem from './NavBarItem';

const AnchorLink = ({ children, href, className, tabIndex, testId }) => {
  return (
    <a href={href}>
      <NavBarItem
        href={href}
        className={className}
        tabIndex={tabIndex}
        testId={testId}
      >
        {children}
      </NavBarItem>
    </a>
  );
};

export default AnchorLink;
