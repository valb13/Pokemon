import {useState} from "react";

export default function ControlBar({atks , setText, setType, lunchAtk, canAtk, end}) {

    function atkHover(index) {
        var atks = document.getElementsByClassName("control-atk");
        for (var i = 0; i < atks.length; i++) {
            if (atks[i].id === index.toString()) {
                atks[i].classList.add("control-atk-hover");
            }
        }
    }

    function atkRemoveHover() {
        var atks = document.getElementsByClassName("control-atk");
        for (var i = 0; i < atks.length; i++) {
            atks[i].classList.remove("control-atk-hover");
        }
    }

    function switchClass(atk) {
        switch (atk.type) {
            case "Electric":
                return "control-atk-elec";
            case "Normal":
                return "control-atk-normal";
            case "Feu":
                return "control-atk-feu";
            case "Eau":
                return "control-atk-eau";
            default:
                return ""; // Par défaut, pas de classe spécifique
        }
    }

    return (
        <>
            {(!canAtk || end) && <div className={"control-wait"}><div className={"control-wait-block"}></div></div>}
            <div className={"control-cont-main"}>
                <div className={"control-cont-atk"}>
                    {atks.map((atk, index) => (
                        <div id={index} className={`btn control-atk ${switchClass(atk)}`}
                             onMouseOver={() => atkHover(index)} onMouseLeave={atkRemoveHover} key={index}>
                            <div className={"control-atk-main"} onClick={() => lunchAtk(atk)}>
                                <span className={"control-atk-help"}>{atk.name}</span>
                            </div>
                            <div className={"control-atk-second"} onClick={() => { setType(2); setText(atk.description); }}>
                                <span id={"help-btn"} > ? </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
}