import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URI } from "../../config";

interface Content {
    _id?: string;
    title: string;
    link: string;
    type: "twitter" | "youtube";
}

export function useContent() {
    const [contents, setContents] = useState<Content[]>([]);
    const [error] = useState<string | null>(null);
    const [loading] = useState<boolean>(false);

    function refresh(){
        axios.get(`${BACKEND_URI}/api/v1/user/content`, {
            headers: {
                        Authorization: localStorage.getItem("token")
            }    
            })
           
            .then((response) => {
                setContents(response.data.content)
            })
    }
    
    useEffect(() => {
        refresh();

    const interval = setInterval(()=> {
        refresh();
    }, 5000);

    return () => {
        clearInterval(interval);
    } 

    }, []);

    
    return {contents, loading, error, refresh};
}