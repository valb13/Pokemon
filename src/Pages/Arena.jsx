import Pokemon from "../Components/Pokemon";
import Control from "../Components/ControlBar";
import Panel from "../Components/Panel";
import ScreenEndGame from "../Components/ScreenEndGame";
import RestartBtn from "../Components/RestartBtn";
import {useEffect, useState} from "react";
import img from "../img/pikachu.png";
import imgSecond from "../img/opps.png";
import {wait} from "@testing-library/user-event/dist/utils";
export default function Arena() {

    const [atk, setAtk] = useState([
        {

            "name": "Boule Elek",
            "type": "Electric",
            "power": 10,
            "accuracy": 100,
            "pp": 10,
            "priority": 0,
            "target": "opposent",
            "effect": "Paralyse",
            "effectChance": 10,
            "description" : "Le lanceur envoie une boule d'électricité. Si sa Vitesse est plus grande que celle de l'ennemi, les dégâts augmentent d'autant."
        },
        {
            "name": "Vive Attaque",
            "type": "Normal",
            "power": 30,
            "accuracy": 100,
            "pp": 30,
            "priority": 1,
            "target": "opposent",
            "effect": "None",
            "effectChance": 0,
            "description" : "Attaque fulgurante qui permet de frapper d'abord."
        },
        {
            "name": "Queue de fer",
            "type": "Normal",
            "power": 20,
            "accuracy": 100,
            "pp": 30,
            "priority": 0,
            "target": "opposent",
            "effect": "None",
            "effectChance": 0,
            "description" : "Attaque avec sa queue. Peut baisser la DEFENSE."
        },
        {
            "name": "Mimi-queue",
            "type": "Normal",
            "power": 25,
            "accuracy": 100,
            "pp": 25,
            "priority": 0,
            "target": "opposent",
            "effect": "Flinch",
            "effectChance": 30,
            "description" : "Remue la queue pour baisser la DEFENSE de l'ennemi."
        }]
    );

    const [atkOpps, setAtkOpps] = useState([
        {
            "name": "Rugissement",
            "type": "Normal",
            "power": 10,
            "accuracy": 80,
            "pp": 10,
            "priority": 0,
            "target": "player",
            "effect": "",
            "effectChance": 10,
            "description" : "Le lanceur pousse un cri tout mimi pour tromper la vigilance de la cible et baisser son Attaque."
        },
        {
            "name": "Spore",
            "type": "Plante",
            "power": 20,
            "accuracy": 50,
            "pp": 10,
            "priority": 0,
            "target": "player",
            "effect": "",
            "effectChance": 10,
            "description" : "Le lanceur répand un nuage de spores qui endort."
        },
        {
            "name": "Tempête Florale",
            "type": "Plante",
            "power": 40,
            "accuracy": 50,
            "pp": 10,
            "priority": 0,
            "target": "player",
            "effect": "",
            "effectChance": 10,
            "description" : "Déclenche une violente tempête de fleurs qui inflige des dégâts à tous les Pokémon alentour."
        },
        {
            "name": "Lutte",
            "type": "Normal",
            "power": 30,
            "accuracy": 50,
            "pp": 10,
            "priority": 0,
            "target": "player",
            "effect": "",
            "effectChance": 10,
            "description" : "Une attaque désespérée, utilisée quand le lanceur n’a plus de PP. Le blesse aussi légèrement."
        },
    ]);

    const [showPanel, setShowPanel] = useState(false);
    const [paneltext, setPanelText] = useState("");
    const [typetextFrom, setTypeTextFrom] = useState();
    const [whoAtk, setWhoAtk] = useState(true); // true = player, false = opps
    const [hpPlayer, setHpPlayer] = useState(50);
    const [hpOpps, setHpOpps] = useState(60);
    const [endGame, setEndGame] = useState(false);
    const handleClosePanel = () => {
        setShowPanel(false);
    };

    const setPanel = (text) => {
        setPanelText(text);
        setShowPanel(true);
    };

    const setTypetext = (text) => {
        setTypeTextFrom(text);
    };

    const chooseAtk = (atk) => {
        var res;
        setPanelText("Le joueur utilise " + atk.name);
        setTypeTextFrom(1);
        setShowPanel(true);
        wait(1400).then(r => setShowPanel(false));
        wait(1600).then(r => AnimatedAtk(whoAtk));
        wait(2500).then(r => {
            res = CalculateDmg(atk);
            if(res) {TakeDmg(whoAtk)}
        });
    };

    function AnimatedAtk(whoAtk) {
        let opp, player, coef, scale;

        if (whoAtk) {
            opp = document.getElementsByClassName("pokemon-img-opposent")[0];
            player = document.getElementsByClassName("pokemon-img")[0];
            coef = 0.35;
            scale = 0.7;
        } else {
            opp = document.getElementsByClassName("pokemon-img")[0];
            player = document.getElementsByClassName("pokemon-img-opposent")[0];
            coef = 0.46;
            scale = 1.2;
        }

        const oppRect = opp.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();

        const translateX = oppRect.left - playerRect.left;
        const translateY = oppRect.top - playerRect.top;

        const playerImg = player.children[0];
        playerImg.style.setProperty('--translate-x', `${translateX * coef}px`);
        playerImg.style.setProperty('--translate-y', `${translateY * coef}px`);

        playerImg.style.setProperty('--scale', scale);

        playerImg.style.animation = 'attack 0.8s forwards';

        setTimeout(() => {
            playerImg.style.animation = '';
        }, 1100);
    }

    function TakeDmg(whoAtk) {
        let opp;
        if (whoAtk) {
            opp = document.getElementsByClassName("pokemon-img-opposent")[0].children[0];
        } else {
            opp = document.getElementsByClassName("pokemon-img")[0].children[0];
        }

        opp.style.animation = 'take-dmg 0.5s forwards';
        setTimeout(() => {
            opp.style.animation = '';
        }, 500);
    }


    function CalculateDmg(atk) {
        var dmg = atk.power; // calcul de la vie restante de l'opposent si il prend l'attaque
        var hp = whoAtk ? hpOpps : hpPlayer;
        //var dmgPlayer = hpPlayer - atk.power; // calcul de la vie restante du joueur si il prend l'attaque

        //TODO : ajouter effet de l'attaque
        //TODO : ajouter effet chance de l'attaque
        //TODO : gérer la vitesse de l'attaque

        var accuracy = Math.floor(Math.random() * 100) <=  atk.accuracy; // calcul de chance de toucher
        var crit = Math.floor(Math.random() * 100) <= 10; // 10% de chance de coup critique
        var effect = Math.floor(Math.random() * 100) <= atk.effectChance; // chance d'effet de l'attaque

        /// Gestion des dégats de base
        //--------------------------------------------------

        if (accuracy) {
            dmg = crit ? dmg * 2 : dmg;
            console.log("touché :"  + accuracy  + " | crit : " + crit + " | dmg : " + dmg + " | whoAtk : " + whoAtk);

            if (hp - dmg < 0) {
                if(whoAtk){ setHpOpps(0); } else {setHpPlayer(0);}
            } else {
                if(whoAtk){ setHpOpps(hpOpps - dmg); } else {setHpPlayer(hpPlayer - dmg);}
            }

            if (crit){
                setPanelText("Coup critique !");
                setTypeTextFrom(1);
                setShowPanel(true);
                wait(2000).then(r => {
                    setShowPanel(false);
                    setWhoAtk(!whoAtk);
                    return true;
                });

            }else{
                setWhoAtk(!whoAtk);
            }

            return true;
        }else {
            setPanelText("L'attaque a échoué !");
            setTypeTextFrom(1);
            setShowPanel(true);
            wait(2000).then(r => {
                setShowPanel(false);
                setWhoAtk(!whoAtk);
                return false;
            });
        }
        //--------------------------------------------------
    }

    function AnimationLifeBar(whoAtk, hpLeft, hpBegin) {
        let lifeBar;
        if (whoAtk) {
            lifeBar = document.getElementById("opps-life-bar").getElementsByClassName("life-bar-hp-left")[0];
        } else {
           lifeBar = document.getElementById("player-life-bar").getElementsByClassName("life-bar-hp-left")[0];
        }

        lifeBar.style.setProperty('--satrt-width-life-bar', hpBegin);
        lifeBar.style.setProperty('--end-width-life-bar', hpLeft);
        lifeBar.style.animation = 'life-bar-anim 1s forwards';

        setTimeout(() => {
            lifeBar.style.animation = '';
        }, 500);

    }

    useEffect(() => {
        console.log("new round");
        if(!whoAtk && hpOpps > 0) {
            wait(2000).then(IA);
        }else if(hpOpps <= 0) {
            setEndGame(true);
            setPanelText("Vous avez gagné !");
            setTypeTextFrom(1);
            setShowPanel(true);
            EndGame();

        }else if (hpPlayer <= 0) {
            setEndGame(true);
            setPanelText("Vous avez perdu !");
            setTypeTextFrom(1);
            setShowPanel(true);
            EndGame();
        }

    }, [whoAtk, setWhoAtk]);

    function IA() {
        //TODO Choose diffuculty
        chooseAtk(atkOpps[Math.floor(Math.random() * 4)]);
    }

    function EndGame() {

        var screen = document.getElementsByClassName("screen-end-to-deploy")[0];

        wait(1000).then(r => {
            screen.style.animation = "end-game 1.25s forwards";
        });
        wait(2300).then(r => {
           screen.style.animation = "";
           screen.style.height = "100vh";
        });
    }

    return (
        <div className={"arena-cont-body"}>
            <div className={"arena-cont-main"}>
                <div className={"arena-cont-pokemon"}>
                    <Pokemon name={"Bulbizzare"} type={"Plante"} level={18} hp={hpOpps} atk={10} def={5} speed={10}
                             opposent={true} img={imgSecond}/>
                    <Pokemon name={"Pikachu"} type={"Electric"} level={15} hp={hpPlayer} atk={10} def={5} speed={10}
                             opposent={false} img={img}/>
                    {showPanel && <Panel text={paneltext} type={typetextFrom} onClose={handleClosePanel} />}
                </div>
                <Control atks={atk} setText={setPanel} setType={setTypetext} lunchAtk={chooseAtk} canAtk={whoAtk} end={endGame}/>
            </div>
            <ScreenEndGame />
            <RestartBtn show={endGame} restart={() => window.location.reload()} />
        </div>
    );
}