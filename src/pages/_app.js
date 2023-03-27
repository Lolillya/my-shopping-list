import React, { use } from 'react'
import Image from 'next/image'
import '@/styles/globals.css'
import catPic from '../../public/cat.png'

import 'firebase/firestore'
import 'firebase/auth'

import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push, onValue, remove } from "firebase/database"

export default function App() {

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


  const [value, setValue] = React.useState("")
  const [shopList, setShopList] = React.useState([])
  const [hasValue, setHasValue] = React.useState()
  const shopListElements = shopList.map(list => 
    <li id='list' onClick={() => removeItem(list[0])} key={list[0]}>{list[1]}</li>)

  React.useEffect(() => {
    onValue(shoppingListDB, function (myDBList) {
      if(myDBList.exists()){
        setHasValue(myDBList.exists())
        let ls = Object.entries(myDBList.val())
        setShopList(ls)
      }
      else
        setHasValue(false)
    })
  }, [])

  console.log(hasValue)

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
    <main>
      <div className='container'>
        <Image src={catPic} id="catImg" alt='catImg' placeholder='blur' />
        <input type={"text"} id={"input-field"} placeholder={"Bread"} onChange={handleChange} value={value}></input>
        <button id={"add-button"} onClick={handleClick}>Add to Cart</button>

        <ul className='shop-list'>
            {hasValue ? shopListElements : <li id='list'>No items here!</li>}
        </ul>

      </div>
    </main>
  )
}
