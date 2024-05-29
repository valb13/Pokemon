export default function Panel({text , type, onClose}) {

    return (
        <div className={"panel-cont"}>
            <div className={"panel"}>
                { type === 2 &&
                <div className={"panel-header-cross"}>
                    <span onClick={onClose}>X</span>
                </div> }
                <span>{text}</span>
            </div>
        </div>

    );
}