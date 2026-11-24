import { useState, useEffect } from "react"
import { getPublicEntries } from "../services/entriesService"
import { Link } from 'react-router'

function EntriesList() {
    const [entries, setEntries] = useState([])

    async function loadEntries() {
        const response = await getPublicEntries()
        setEntries(response)
    }

    useEffect(()=>{
        loadEntries()
    }, [])

  return (
    <div>
        <h1>Entries List</h1>
        {entries ? entries.map(oneEntry => 
        <div key={oneEntry._id}>
            <h3>{oneEntry.title}</h3>
            <h3>{oneEntry.entryBody}</h3>
            <h3>{oneEntry.isPublic}</h3>
            <Link to={`/entries/${oneEntry._id}`}>View Entry Details</Link>
        </div>
        ) : <h3>No Entries Posted Yet</h3>}
      
    </div>
  )
}

export default EntriesList
