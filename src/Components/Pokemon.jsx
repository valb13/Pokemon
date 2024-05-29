import LifeBar from "./LifeBar";
import plateforme from "../img/plateforme.png";
import {useEffect} from "react";

export default function Pokemon({name, type,opposent, level, hp, atk, def, speed, img, updateHpLeft}  ) {

    return (
        <div className={opposent ? "pokemon-opposent" : "pokemon"}>
            <div className={"pokemon-life-bar"}>
                <LifeBar hp={hp} name={name} level={level} type={type} opposent={opposent} updateHpLeft={updateHpLeft}/>
            </div>
            <div className={opposent ? "pokemon-img-opposent" : "pokemon-img"}>
                <img src={img} alt={name} id={"pokemon"}/>
                <img src={plateforme} className={opposent ? "pokemon-plateforme-opposent" : "pokemon-plateforme"}/>
            </div>
        </div>
    );
}