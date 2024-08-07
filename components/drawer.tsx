const Drawer = ({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) => {
  return (
    <div className='flex-none'>
      <div className='drawer'>
        <input id='my-drawer' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content'>
          {/* Page content here */}
          <label
            htmlFor='my-drawer'
            tabIndex={0}
            className='btn btn-ghost btn-circle'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h7'
              />
            </svg>
          </label>
        </div>
        <div className='drawer-side '>
          <label htmlFor={htmlFor} className='drawer-overlay'></label>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
