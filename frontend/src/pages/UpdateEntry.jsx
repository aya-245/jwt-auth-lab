import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { getEntryById, updateEntry } from "../services/entriesService"

function UpdateEntry() {
    const [formData, setFormData] = useState({
        title: '',
        entryBody: '',
        isPublic: false
    })

    const {entryId} = useParams()
    
    async function loadEntry(){
        const response = await getEntryById(entryId)
        setFormData(response)
    }

    const navigate = useNavigate()

  function handleChange(event) {
    const { name, type, value, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  useEffect(()=>{
    loadEntry()
  },[])

    async function handleSubmit(event){
        event.preventDefault()
        const response = await updateEntry(entryId, formData)
        navigate('/entries/my-entries')
    }

  return (

    <div>
        <h1>Edit Entry</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input 
        type="text" 
        name="title" 
        id="title"
        value={formData.title}
        onChange={handleChange}
        />

        <label htmlFor="entryBody">Entry Body:</label>
        <input 
        type="text" 
        name="entryBody" 
        id="entryBody" 
        value={formData.entryBody}
        onChange={handleChange}
        />

        <label htmlFor="isPublic">Public?</label>
        <input 
        type="checkbox" 
        name="isPublic" 
        id="isPublic" 
        checked={formData.isPublic}
        onChange={handleChange}
        />

        <button>Edit Entry</button>
      </form>
      
    </div>
  )
}

export default UpdateEntry
