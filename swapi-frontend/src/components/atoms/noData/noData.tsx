import React from "react";
import "./noData.scss";
import { mapModifiers } from "../../../libs/component";
import Button from "../button/button";

interface INoDataProps {
  message?: string;
  icon?: React.ReactNode;
  showButton?: boolean;
  buttonLabel?: string;
  onButtonClick?: () => void;
  variant?: "default" | "small";
}

const NoData: React.FC<INoDataProps> = ({
  message = "No Data Available",
  icon,
  showButton = false,
  buttonLabel = "Retry",
  onButtonClick,
  variant = "default",
}) => {
  const componentClassName = "a-no-data";

  return (
    <div className={mapModifiers(componentClassName, variant)}>
      {icon && <div className="a-no-data__icon">{icon}</div>}
      <p className="a-no-data__message">{message}</p>
      {showButton && onButtonClick && (
        <Button onClick={onButtonClick} label={buttonLabel} backgroundColor="gradientPink"/>     
      )}
    </div>
  );
};

export default NoData;
