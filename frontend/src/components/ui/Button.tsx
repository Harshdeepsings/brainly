

export interface ButtonProps {
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: any;
    endIcon?: any;
    onClick?: () => void;
    loading?: boolean;
}

const variantStyles = {
    "primary": "bg-purple-600 hover:bg-purple-700 text-white transition-colors",
    "secondary": "bg-purple-300 text-purple-600 dark:bg-purple-950 dark:text-purple-300 dark:hover:bg-purple-900 transition-colors"
}

const sizeStyles = {
    "sm": "py-1 px-2",
    "md": "py-2 px-4",
    "lg": "py-2.5 px-4 sm:py-4 sm:px-8 text-sm sm:text-base"
}

const defaultStyles = "rounded-md flex items-center justify-center"

export const Button = (props: ButtonProps) => {
    return <button onClick={props.onClick} disabled= {props.loading} className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]} ${props.loading?"opacity-45 cursor-not-allowed":"cursor-pointer"}`}>
            {props.startIcon? <div className="pr-2">{props.startIcon}</div>: null}{props.text}{props.endIcon? <div className="pr-2">{props.endIcon}</div>: null}
        </button>
}



