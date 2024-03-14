export function Wrapper({ children, className, ...props }) {
  return (
    <div
      className={`w-full px-5 xl:max-w-page md:px-8 lg:px-9 xl:px-16 mx-auto relative ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
