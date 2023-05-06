import React from 'react'
import '@/styles/globals.css'

import Header from './components/Header'
import MainContent from './components/MainContent'
import Sidebar from './components/Sidebar'
import Messaging from './components/Messaging'


export default function App() {


  const [toggleSettings, setToggleSettings] = React.useState(false)
  const [mainActive, setMainActive] = React.useState(true)

  function onClickSettings() {
    setToggleSettings(prevState => {
      return (!prevState) })
  }

  return (
    <main>
      <div className='container'>

        <Header onClickSettings={onClickSettings} />
        {toggleSettings && <Sidebar />}

        {mainActive && <MainContent/>}
        {!mainActive && <Messaging />}

      </div>
    </main>
  )
}
