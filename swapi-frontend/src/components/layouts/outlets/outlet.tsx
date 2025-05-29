import "./outlet.scss";
import React from "react";
import Header from "../../molecules/header/header";
import { ChevronLeft } from "lucide-react";
import { mapModifiers } from "../../../libs/component";

interface IOutletProps {
  children: React.ReactNode; // Any component(s) passed as children
  searchHandler?: (value:string) => void; // Optional search handler function
  isButtonHidden?:boolean;
  isSearchbarHidden?:boolean;
}

const Outlet: React.FC<IOutletProps> = ({ children,searchHandler,isButtonHidden,isSearchbarHidden }) => {
  const componentClassName = "l-outlet";

  return (
    <div className={mapModifiers(componentClassName,isButtonHidden && "isButtonHidden")}>
      <Header onSearch={searchHandler || (() => {})} isSearchbarHidden={isSearchbarHidden}/> {/* Header component */}
      <div className={`${componentClassName}__content`}>{children}</div> {/* Render children */}
      <div className={`${componentClassName}__button`} onClick={() => window.location.reload()}>
            <ChevronLeft size={24} />
        </div>
    </div>
  );
};

export default Outlet;