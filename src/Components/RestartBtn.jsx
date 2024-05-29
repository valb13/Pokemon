import {useEffect} from "react";
import {wait} from "@testing-library/user-event/dist/utils";

export default function RestartBtn({show , restart}) {

    useEffect(() => {

        if(show) {
            var btn = document.getElementsByClassName("restart-btn")[0];
            wait(2300).then(() => {
                btn.style.display = "block";
                btn.style.animation = "btn-restart 0.8s forwards";
            });
        }

    }, [show]);

    return (
        <>
            {show &&
                <div className={"restart-cont"}>
                    <div className={"btn restart-btn"} onClick={restart}>
                        <span>Rejouer</span>
                    </div>
                </div>
            }
        </>
    );
}