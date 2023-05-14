import { useEffect, useState } from "react";

export default function Scrape() {
    const [output, setOutput] = useState("")

    useEffect(() => {
        fetch('/api/scraper')
        .then(res => res.json())
        .then(jokeJSON=> {
            setOutput(jokeJSON)
        })
    }, []);

    return (
        <blockquote>{output}</blockquote>
    )
}