import React from "react";
import Header from "../../molecules/header/header";

interface IOutletProps {
  children: React.ReactNode; // Any component(s) passed as children
  searchHandler?: (value:string) => void; // Optional search handler function
}

const Outlet: React.FC<IOutletProps> = ({ children,searchHandler }) => {
  const componentClassName = "l-outlet";

  return (
    <div className={componentClassName}>
      <Header onSearch={searchHandler || (() => {})} /> {/* Header component */}
      <div className={`${componentClassName}__content`}>{children}</div> {/* Render children */}
    </div>
  );
};

export default Outlet;