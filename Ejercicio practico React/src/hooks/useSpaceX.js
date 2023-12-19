import { useEffect, useState } from "react";

export const useSpaceX = () => {
const [rockets, setRockets] = useState([]);
    useEffect(() => {
        fetch("https://api.spacexdata.com/v5/launches/query",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: {},
                options: {
                    sort:{
                        date_unix: "asc",

                    },
                    limit:12,
                },
            }),
        })
        .then((response) => response.json())
        .then((data) => setRockets(data.docs));
    }, [rockets]);
    return { rockets };
}