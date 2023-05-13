import React from 'react'
import '@/styles/globals.css'

import Header from './components/Header'
import MainContent from './components/MainContent'
import Sidebar from './components/Sidebar'
import Messaging from './components/Messaging'


export default function App() {


  const [toggleSettings, setToggleSettings] = React.useState(false)
  const [mainActive, setMainActive] = React.useState(true)
  const [name, setName] = React.useState("")

  function onClickSettings() {
    setToggleSettings(prevState => {
      return (!prevState) })
  }

  function handleChange(event) {
    setName(event.target.value)
  }

  function msgWindow() {
    setMainActive(false)
    // onClickSettings()
  }

  function returnHome() {
    setMainActive(true)
    // onClickSettings()
  }

  return (
    <main>
      <div className='container'>

        <Header onClickSettings={onClickSettings} getName={name} handleChange={handleChange} msgWindow={msgWindow} returnHome={returnHome}/>
        {toggleSettings && <Sidebar  msgWindow={msgWindow} returnHome={returnHome} toggleSettings={onClickSettings}/>}

        {mainActive && <MainContent/>}
        {!mainActive && <Messaging getName={name}/>}

      </div>
    </main>
  )
}
