import type { ReactElement } from "react"

interface SidebarItemsProps {
    startIcon: ReactElement;
    text: string;
    onClick?: () => void;
    active?: boolean;
}

export const SidebarItems = (props: SidebarItemsProps) => {
    return (
        <div
            onClick={props.onClick}
            className={`flex py-2 cursor-pointer rounded max-w-48 pl-4 transition-all duration-150 font-medium
                ${props.active
                    ? "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300"
                    : "hover:bg-gray-200 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300"
                }`}
        >
            <div className="p-2">
                {props.startIcon}
            </div>
            <div className="p-2">
                {props.text}
            </div>
        </div>
    );
}