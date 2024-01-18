import React, { useEffect, useState } from 'react'
import Header from './Header'
    function About() {
        let [apiData, setApiData] = useState(null);
        useEffect(()=>{
            fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then(data => setApiData(data))
        }, [])


        return (
        <div>
            <h1>Example about</h1>

            <ul>{apiData && apiData.map((item) => <li key={item.id}>{item.title}</li>)}</ul>
        </div>
        )

    }

export default About