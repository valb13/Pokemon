import {useEffect, useState} from "react";

export default function LifeBar({hp, name, level, type, opposent, updateHpLeft } ) {

    const [hpBegin, setHpBegin] = useState(hp);
    const [colorLifeBar, setColorLifeBar] = useState("green");

    useEffect(() => {
        if (hp <= hpBegin / 4) {
            setColorLifeBar("red");
        } else if (hp <= hpBegin / 2) {
            setColorLifeBar("orange");
        } else {
            setColorLifeBar("green");
        }
    }, [hp, hpBegin]);

    return (
        <div className={"life-bar"} id={opposent ? "opps-life-bar" : "player-life-bar"}>
            <div className={"life-bar-cont-main"}>
                <div className={"life-bar-cont-info"}>
                    <div className={"life-bar-name"}>
                        <span>{name}</span>
                    </div>
                    <div>
                        <span>Lv: {level}</span>
                    </div>
                </div>
                <div className={"life-bar-cont-hp"}>
                    <div className={"life-bar-hp-progress"}>
                        <div className={"life-bar-hp-left"} style={{width: `${(hp / hpBegin) * 100}%`, backgroundColor : colorLifeBar, height : "100%", transition : 0.5}}></div>
                    </div>
                    <span>{hp} / {hpBegin}</span>
                </div>
            </div>
        </div>
    );
}