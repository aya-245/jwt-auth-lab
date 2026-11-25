import { useParams, Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { deleteEntry, getEntryById } from "../services/entriesService"
import { useAuth } from "../context/AuthContext";

function EntryDetails() {
    const [entry, setEntry]= useState(null)
    const [error, setError]= useState(null)
    const navigate = useNavigate()
    const { entryId } = useParams()
    const { user } = useAuth()

    async function loadEntry(){
        try{
            const response = await getEntryById(entryId)
            setEntry(response)
        } catch(err){
            setError(err.response.data.message)
        }
    }

    useEffect(()=>{
      loadEntry()
    },[])

    async function handleDelete(){
        const response = await deleteEntry(entryId)
        navigate('/entries/my-entries')
    }

  return (
    <div>
      <h1>Entry Details</h1>
      {entry ? <div>
        <p>Title: {entry.title}</p>
        <p>{entry.entryBody}</p>
        {entry.isPublic ? <p>Entry Is Public</p> : <p>Entry Is Private</p> }
        {String(entry.owner) === String(user._id) ? 
        <div>
            <Link to={`/entries/${entry._id}/edit`}>Upate Entry</Link>
            <button onClick={handleDelete}>Delete Entry</button>
        </div> : null}
        
      </div> : <h3>No Entry Found</h3>}
    </div>
  )
}

export default EntryDetails
