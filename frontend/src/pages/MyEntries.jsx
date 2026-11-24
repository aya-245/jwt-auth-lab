import { useState, useEffect } from "react"
import { getMyEntries } from "../services/entriesService"
import { Link } from 'react-router'

function MyEntries() {
    const [entries, setEntries] = useState([])

    async function loadEntries() {
        const response = await getMyEntries()
        setEntries(response)
    }

    useEffect(()=>{
        loadEntries()
    }, [])

  return (
    <div>
        <h1>My Entries</h1>
        <Link to={'/entries/create'}>Add New Entry</Link>
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

export default MyEntries


