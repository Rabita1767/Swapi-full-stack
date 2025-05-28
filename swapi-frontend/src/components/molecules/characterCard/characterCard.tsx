import {useNavigate} from "react-router-dom";
import type { ICharacter } from "../../../types/type";
import Button from "../../atoms/button/button";
import Text from "../../atoms/text/text";
import "./characterCard.scss";

interface ICharacterCard {
   data:ICharacter[];
}

const CharacterCard:React.FC<ICharacterCard>=({data})=>{
    const navigate= useNavigate();
    const componentClassName= "m-character-card";
    
    const clickHandler=(id:string)=>{
        console.log("id",id);
        navigate(`/character/${id}`);
        
    }
      
    return(
        <div className={componentClassName}>
       {data && data.length>0 && data.map((character:ICharacter) => (
         <div className={`${componentClassName}__container`} key={character?.details?._id}>
         <div className={`${componentClassName}__contentHeader`}>
             <div className={`${componentClassName}__contentHeader__main`}>
                 {/* <img
                     className={`${componentClassName}__contentHeader__image`}
                     src="https://starwars-visualguide.com/assets/img/characters/1.jpg"
                     alt="character"
                 /> */}
                 <div className={`${componentClassName}__contentHeader__text`}>
                    <Text color="white" fontSize="24" fontWeight="600" children={character?.name ?? 'N/A'}/>
                     <Text color="purple" fontSize="18" children={character?.details?.properties?.gender.toUpperCase() ?? "N/A"}/>
                 </div>
             </div>
         </div>
         <Text children={character?.details?.description} color="gray"/>
         <div className={`${componentClassName}__contentFooter`}>
              <div className={`${componentClassName}__contentFooter__main`}>
                <Text color="gray" children={character?.details?.properties?.birth_year ?? "N/A"}/>
              </div>
                <div className={`${componentClassName}__contentFooter__main`}><Text color="gray" children={character?.details?.properties?.eye_color.toUpperCase() ?? "N/A"}/></div>
                <div className={`${componentClassName}__contentFooter__main`}><Text color="gray" children={character?.details?.properties?.height ?? "N/A"}/></div>
         </div>
         <div className={`${componentClassName}__buttonContainer`}>
            <Button onClick={() => clickHandler(character?.uid)} label="View Details"/>
         </div>
        </div>
       ))}
        </div>
    )

}

export default CharacterCard;