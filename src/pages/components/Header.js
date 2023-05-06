import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import appIcon from "../../../public/android-chrome-192x192.png"
import Image from "next/image"

export default function Header(props) {

    return (
        <header className="header--container">
            <FontAwesomeIcon icon={faBars}
                onClick={props.onClickSettings}/>
            <Image src={appIcon} id="app--icon--header"/>
        </header>
    )
}