import "./singleCharacterCard.scss";
import { ChevronLeft, Code2 } from "lucide-react";
import Text from "../../atoms/text/text";
import type { CharacterResult } from "../../../types/type";
import { useNavigate, useParams } from "react-router-dom";
interface IProps{
    data:CharacterResult | null;
}
const SingleCharacterCard:React.FC<IProps> = ({data}) => { 
    const navigate = useNavigate();
    const {id}=useParams();
    const componentClassName="m-single-character-card";
    return(
        <>
        {data && (
            <div className={componentClassName}>
            <div className={`${componentClassName}__content`}>
                <div className={`${componentClassName}__header`}>
                    <div className={`${componentClassName}__header__icon`}>
                    <Code2 className="text-purple-400" size={24} />
                    </div>
                    <div>
                    <Text fontSize="24" fontWeight="600" color="white" children={data?.properties?.name ?? "N/A"} />
                    </div>
                </div>
                <div>
                <Text fontSize="18" color="gray" lineHeight='28lh' children="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
" />
                </div>
                <div className={`${componentClassName}__midSection`}>
                <div className={`${componentClassName}__midSection__main`}><Text color="gray" lineHeight='28lh' children={data?.properties?.skin_color}/></div>
                <div className={`${componentClassName}__midSection__main`}><Text color="gray" lineHeight='28lh' children={data?.properties?.hair_color}/></div>
                <div className={`${componentClassName}__midSection__main`}><Text color="gray" lineHeight='28lh' children={data?.properties?.hair_color}/></div>
                <div className={`${componentClassName}__midSection__main`}><Text color="gray" lineHeight='28lh' children={data?.properties?.height}/></div>
                </div>
                <div>
                <Text fontSize="16" fontWeight="600" color="purple" children="Key Features" />
                    <ul>
                        {data?.properties &&
                            Object.entries(data.properties).map(([key, value]) => (
                                <li key={key}>
                                    <ul>
                                      <Text color="gray" lineHeight='28lh' children={<>{key.toUpperCase()}: <span>{value}</span></>} onClick={key==="url" ? ()=>navigate(`/character/${id}`) : ()=>{}} isPointer={key==="url"}/>
                                    </ul>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
        )}
        <div className={`${componentClassName}__button`} onClick={()=>navigate("/")}>
            <ChevronLeft size={24} />
        </div>
        </>
    )
  }
export default SingleCharacterCard;