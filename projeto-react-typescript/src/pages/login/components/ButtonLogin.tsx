interface IButtonLoginProps {
    type?: "button" | "submit" | "reset";
    onClick: () => void;
    children: React.ReactNode;
}

export const ButtonLogin: React.FC<IButtonLoginProps> = ({ type, onClick, children }) => {
    return (
        <button type={type}>{children}</button>
    )
}