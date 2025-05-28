import type { ReactNode } from "react";
import "./text.scss";
import { mapModifiers } from "../../../libs/component";
interface IProps {
    fontSize?: "14" | "16" | "18" | "20" | "24" | "32";
    fontWeight?: "400" | "500" | "600" | "700";
    fontStyle?: "normal" | "italic";
    fontFamily?: "Arial" | "Helvetica" | "Times New Roman" | "Courier New";
    color?: "black" | "white" | "red" | "blue" | "green" | "purple" | "gray" |"duskyGray";
    lineHeight?:"32lh" | "28lh"
    children: ReactNode | string,
    onClick?: () => void;
    isPointer?:boolean
}
const Text: React.FC<IProps> = ({ fontSize,fontWeight,fontStyle,fontFamily,color,lineHeight, children, onClick ,isPointer}) => {
    return (
        <p className={mapModifiers("a-text",fontSize,fontWeight,fontStyle,fontFamily,color,lineHeight,isPointer && "isPointer")} onClick={onClick}>
            {children}
        </p>
    );
};

export default Text;
