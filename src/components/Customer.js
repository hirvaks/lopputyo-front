import React, { useEffect, useState } from "react";

function Customer(props) {

    const [asikas, setAsiakas] = useState([])

    const fetchLink = (info, linkki) => {
        console.log(`### Customer.js: fetching from ${info} with the link below:\n${linkki}`)
        return fetch(linkki).then(response => response.json())
    }

    useEffect(() => {
        fetchLink('useEffect', props.customerLink)
        .then(data => setAsiakas(data))
    }, [])

    console.log(`### Customer.js: asiakas.firstname: ${asikas.firstname}`)

    return (
        <>{`${asikas.firstname} ${asikas.lastname}`}</>
    )
}
export default Customer