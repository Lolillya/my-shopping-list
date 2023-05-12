import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import appIcon from "../../../public/android-chrome-192x192.png"
import Image from "next/image"

export default function Header(props) {

    return (
        <header className="header--container">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <FontAwesomeIcon icon={faBars}
                    onClick={props.onClickSettings} />

                {/* <h4 style={{margin: 0}}>{props.getName}</h4> */}
                <input id="userName" placeholder="Enter Name" onChange={props.handleChange} value={props.getName} />

            </div>
            <Image src={appIcon} id="app--icon--header" />
        </header>
    )
}