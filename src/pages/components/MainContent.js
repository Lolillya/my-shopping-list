import React from "react"

import 'firebase/firestore'
import 'firebase/auth'

import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push, onValue, remove } from "firebase/database"

export default function MainContent() {
    //------------------------------------------------------
    // Database setup --------------------------------------
    //------------------------------------------------------

    const appSettings = {
        databaseURL: "https://playground-949fe-default-rtdb.asia-southeast1.firebasedatabase.app/"
    }

    const app = initializeApp(appSettings)
    const database = getDatabase(app)
    const shoppingListDB = ref(database, "shoppingList")

    //-------------------------------------------------------
    //-------------------------------------------------------
    //-------------------------------------------------------


    const [value, setValue] = React.useState("")
    const [shopList, setShopList] = React.useState([])
    const [hasValue, setHasValue] = React.useState()

    const shopListElements = shopList.map(list =>
        <li id='list' key={list[0]}>
            <p id="item--name">{list[1]}</p>

            <div id="selection--container">
                <div id="check_Box">
                    /
                </div>
                <div id="X_Box" onClick={() => removeItem(list[0])}>
                    X
                </div>
            </div>
            <div rowspan={2} id="list--dropdown--button">
                ...
            </div>
        </li>
    )

    React.useEffect(() => {
        onValue(shoppingListDB, function (myDBList) {
            if (myDBList.exists()) {
                setHasValue(myDBList.exists())
                let ls = Object.entries(myDBList.val())
                setShopList(ls)
            }
            else
                setHasValue(false)
        })
    }, [])

    function removeItem(key) {
        let exactDBLoc = ref(database, `shoppingList/${key}`)
        remove(exactDBLoc)
    }

    function handleChange(event) {
        setValue(event.target.value)
    }

    function handleClick() {
        push(shoppingListDB, value)
        setValue("")
    }
    return (
        <div className="main--container">
            <section className='shop-list--container'>
                <ul className='shop-list'>
                    {hasValue && shopListElements}
                </ul>
                {!hasValue && <h3 style={{ alignSelf: 'center' }}>No items added</h3>}
            </section>

            <section className='input--container'>
                <input id={"input-field"} type={"text"} placeholder={"Enter item"} onChange={handleChange} value={value}></input>
                <button id={"add-button"} onClick={handleClick}>Add to Cart</button>
            </section>
        </div>
    )
}