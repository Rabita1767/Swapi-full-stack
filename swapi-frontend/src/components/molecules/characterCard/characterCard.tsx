import {useNavigate} from "react-router-dom";
import { motion } from "framer-motion";
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
    const delay = 0.5;
    const duration = 1.8;
    
    const clickHandler=(id:string)=>{
        navigate(`/character/${id}`);    
    }
      
    return(
        <motion.div className={componentClassName}
        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: duration, delay: delay }}
                        viewport={{ once: true }}
        >
       {data && data.length>0 && data.map((character:ICharacter) => (
         <div
         className={`${componentClassName}__container`}
         key={character?.details?._id}      
       >
         <div className={`${componentClassName}__contentHeader`}>
             <div className={`${componentClassName}__contentHeader__main`}>
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
            <Button onClick={() => clickHandler(character?.uid)} label="View Details" backgroundColor="gradientPink"/>
         </div>
         </div>
       ))}
        </motion.div>
    )

}

export default CharacterCard;