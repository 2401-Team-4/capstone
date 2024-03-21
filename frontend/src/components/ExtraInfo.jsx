import NetworkRequests from './NetworkRequests'
import ConsoleLogs from './ConsoleLogs'
import Errors from './Errors'
import ExtraInfoSearch from './singles/ExtraInfoSearch'

import { useState, useEffect } from 'react'

const ExtraInfo = ({session}) => {
  const [activeTab, setActiveTab] = useState('Network')
  const [requests, setRequests] = useState(() => session.network)
  const [searchResults, setSearchResults] = useState(() => session.network)

  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    setRequests(session.network)
    if (!searchInput) setSearchResults(requests)

    const filteredByName = requests.filter(r => r.data.url.includes(searchInput))
    setSearchResults(filteredByName)
  }, [session, setSearchInput, searchInput, requests])

  const setActive = (e) => {
    setActiveTab(e.target.textContent)
  }


  return (
    <div className="extra-info">
      <div className="extra-info-tab-controls">
        <button 
          className={`tab-button ${activeTab === 'Network' ? 'active' : ''}`} 
          onClick={setActive}
          >Network</button>

        <button 
          className={`tab-button ${activeTab === 'Logs' ? 'active' : ''}`} 
          onClick={setActive}
          >Logs</button>

        <button 
          className={`tab-button ${activeTab === 'Errors' ? 'active' : ''}`} 
          onClick={setActive}
          >Errors</button>


        <div className='extra-info-search'>
          <ExtraInfoSearch setSearchInput={setSearchInput}/>
        </div>
      </div>

      <div className='extra-info-content'>
        {activeTab === 'Network' && requests.length > 0 ? 
          <NetworkRequests requests={searchResults} session={session}/> : 
          null
        }
        {activeTab === 'Logs' ? <ConsoleLogs logs={session.logs}/> : null}
        {activeTab === 'Errors' ? <Errors errors={session.errors} session={session}/> : null}
      </div>
    </div>
  )
}


export default ExtraInfo