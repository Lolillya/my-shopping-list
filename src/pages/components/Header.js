import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { faMessage } from "@fortawesome/free-solid-svg-icons"
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { faAddressCard } from "@fortawesome/free-solid-svg-icons"
import { faHouse } from "@fortawesome/free-solid-svg-icons"

import appIcon from "../../../public/android-chrome-192x192.png"
import Image from "next/image"

export default function Header(props) {

    return (
        <header className="header--container">
            {/* <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <FontAwesomeIcon icon={faBars}
                    onClick={props.onClickSettings} /> */}


            <input id="userName" placeholder="Enter Name" onChange={props.handleChange} value={props.getName} />

            {/* </div> */}
            {/* <section style={{display: "flex", gap: "20px"}}> */}

            <div style={{ display: "flex", flexDirection: "column" }} onClick={props.returnHome}>
                <FontAwesomeIcon icon={faHouse} />
                <h6 style={{ margin: 0, padding: 0 }}>Home</h6>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }} onClick={props.msgWindow}>
                <FontAwesomeIcon icon={faMessage} />
                <h6 style={{ margin: 0, padding: 0 }}>Messages</h6>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <FontAwesomeIcon icon={faLocationDot} />
                <h6 style={{ margin: 0, padding: 0 }}>Navigation</h6>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <FontAwesomeIcon icon={faAddressCard} />
                <h6 style={{ margin: 0, padding: 0 }}>About us</h6>
            </div>
            {/* </section> */}
            <Image src={appIcon} id="app--icon--header" />
        </header>
    )
}