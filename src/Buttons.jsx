import "./Buttons.css";

export const SolidButton = ({ text  = "default", color = "green" }) => {
    return (
        <button style={{backgroundColor: color}} className='solid-btn'>{text}</button>
    );
}

export function OutlineButton({ text  = "default", color = "black" }) {
    return (
        <button style={{border: `1px solid ${color}`}} className="outline-btn">{text}</button>
    );
}

export const AnimatedButton = () => {
    return (
        <button className="animated-btn">B</button>
    );
}