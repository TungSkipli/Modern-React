
import reactDom from "react-dom";

export default function Printing() {
    const message = [1, 2, 3];
    const time = new Date().toLocaleTimeString();
    return (
        <div>
            <h1>{message}</h1>
            <p>Current time: {time}</p>
            <input  type="text" placeholder="enter please"></input>
            <header/>
            <input type="number" min={3} max={5} placeholder="enter please"></input>

            <div className="wrapper">
        <textarea
            readOnly
            maxLength={3}
            spellCheck
            style= {{ backgroundColor: "gray" }}
        />
        </div>
        </div>
    );
}
