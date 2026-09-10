interface InputProps {
    reference?: any;
    placeholder: string;
    type: "text" | "password" | "email";
}

export const Input = ({placeholder, reference, type}: InputProps) => {
    return <div className="w-full">
        <input ref={reference} placeholder={placeholder} type={type} className="px-4 py-2 border border-gray-300 dark:border-slate-700 rounded m-2 w-[calc(100%-1rem)] box-border outline-none bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-purple-500 transition-colors"  ></input>
    </div>
};