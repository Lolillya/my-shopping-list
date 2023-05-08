import React from "react"
// import { nanoid } from 'nanoid'

import 'firebase/firestore'
import 'firebase/auth'

import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push, onValue, remove, set, update } from "firebase/database"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { faCaretUp } from "@fortawesome/free-solid-svg-icons"
// import { increment } from "firebase/firestore"


export default function MainContent() {
    //------------------------------------------------------
    // Database setup --------------------------------------
    //------------------------------------------------------

    const appSettings = {
        databaseURL: "https://playground-949fe-default-rtdb.asia-southeast1.firebasedatabase.app/"
    }

    const app = initializeApp(appSettings)
    const database = getDatabase(app)
    const shoppingListDB = ref(database, `shoppingList/`)

    //-------------------------------------------------------
    //-------------------------------------------------------
    //-------------------------------------------------------

    const [value, setValue] = React.useState("")
    const [shopList, setShopList] = React.useState([])
    const [hasValue, setHasValue] = React.useState()

    const shopListElements = shopList.map(list =>
        <li id='list' key={list.key} style={list.checked ? { backgroundColor: "#b4f7a3" } : {}}>

            <section id="itembox--container">
                <p id="item--name">{list.name}</p>
                <div id="selection--container">
                    <div id="check_Box" onClick={() => checkItem(list.key, list.checked)}>
                        /
                    </div>
                    <div id="X_Box" onClick={() => removeItem(list.key)}>
                        X
                    </div>
                </div>
            </section>

            {list.dropdownShown &&
                <section className="alt--sidenote--container">
                    <div id="alt">
                        <h5 style={{ marginBottom: "10px" }}>Alternatives</h5>
                        <h6 style={{ margin: 0 }}>No alternatives listed.</h6>
                    </div>

                    <div id="sidenote">
                        <h5 style={{ marginBottom: "10px" }}>Sidenotes</h5>
                        <h6 style={{ margin: 0 }}>No sidenotes posted</h6>
                    </div>
                </section>}

            <div id="list--dropdown--button">
                {list.dropdownShown ?
                    <FontAwesomeIcon icon={faCaretUp} onClick={() => showDropdown(list.key, list.dropdownShown)} /> :
                    <FontAwesomeIcon icon={faCaretDown} onClick={() => showDropdown(list.key, list.dropdownShown)} />}
            </div>
        </li>
    )

    React.useEffect(() => {
        onValue(shoppingListDB, function (myDBList) {
            if (myDBList.exists()) {
                setHasValue(myDBList.exists())
                let ls = Object.values(myDBList.val())
                setShopList(ls)
            }
            else
                setHasValue(false)
        })
    }, [])

    function showDropdown(key, dropdown) {
        update(ref(database, 'shoppingList/' + key), {
            dropdownShown: !dropdown
        })
    }

    function checkItem(key, checked) {
        update(ref(database, `shoppingList/` + key), {
            checked: !checked
        })
    }

    function removeItem(key) {
        let exactDBLoc = ref(database, `shoppingList/${key}`)
        remove(exactDBLoc)
    }

    function handleChange(event) {
        setValue(event.target.value)
    }

    function handleClick() {
        // let key = nanoid();

        // set(ref(database, "shoppingList/"+ key), {
        // name: value,
        // key: key,
        // checked: false,
        // dropdownShown: false
        // })
        if (value.length != 0 && value.length <= 25)
            push(ref(database, `shoppingList/`), {
                name: value,
                key: "",
                checked: false,
                dropdownShown: false
            })

        else
            console.log("Emtpy field!")
        setValue("")

        onValue(shoppingListDB, function (myDBList) {
            if (myDBList.exists()) {
                let key = Object.keys(myDBList.val())
                update(ref(database, 'shoppingList/' + key[key.length - 1]), {
                    key: key[key.length - 1]
                })
            }
        })
    }
    return (
        <div className="main--container">
            <section className='shop-list--container'>
                <ul className='shop-list'>
                    {hasValue && shopListElements}
                </ul>
                {!hasValue && <h3 style={{ justifyContent: 'center' }}>No items added</h3>}
            </section>

            <section className='input--container'>
                <input id={"input-field"} type={"text"} placeholder={"Enter item"} onChange={handleChange} value={value}></input>
                <button id={"add-button"} onClick={handleClick}>Add to Cart</button>
            </section>
        </div>
    )
}