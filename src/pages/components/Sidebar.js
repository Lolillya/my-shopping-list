import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMessage } from "@fortawesome/free-solid-svg-icons"
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { faAddressCard } from "@fortawesome/free-solid-svg-icons"
import { faHouse } from "@fortawesome/free-solid-svg-icons"

import Image from "next/image"
import profilePic from "../../../public/Profile_pic.png"

export default function Sidebar(props) {

    return (
        <section className="Sidebar--container">
            <div className="Sidebar">
                <div>
                    <Image src={profilePic} style={{width: "150px", height: "auto"}}/>
                </div>

                <div id="sidebar--ico" onClick={props.returnHome}>
                    <h4 style={{margin: 0}}>Home</h4>
                    <FontAwesomeIcon icon={faHouse} />
                </div>

                <div id="sidebar--ico" onClick={props.msgWindow}>
                    <h4 style={{ margin: 0 }}>Messages</h4>
                    <FontAwesomeIcon icon={faMessage} />
                </div>

                <div id="sidebar--ico">
                    <h4 style={{ margin: 0 }}>Live Location</h4>
                    <FontAwesomeIcon icon={faLocationDot} />
                </div>

                <div id="sidebar--ico">
                    <h4 style={{ margin: 0 }}>Abous us</h4>
                    <FontAwesomeIcon icon={faAddressCard} />
                </div>
            </div>
        </section>
    )
}