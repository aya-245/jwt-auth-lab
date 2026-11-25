import { useState } from "react"
import { createEntry } from "../services/entriesService";
import { useNavigate } from "react-router"

function CreateEntry() {
    const [formData, setFormData] = useState({
        title: '',
        entryBody: '',
        isPublic: false
    })
    const navigate = useNavigate()

    function handleChange(event) {
        const { name, type, value, checked } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    async function handleSubmit(event){
        event.preventDefault()
        const response = await createEntry(formData)
        navigate('/entries/my-entries')
    }

    return (
        <div>
            <h1>Create Entry</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title: </label>
                <input 
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                />

                <label htmlFor="entryBody">Body: </label>
                <input 
                type="text"
                name="entryBody"
                id="entryBody"
                value={formData.entryBody}
                onChange={handleChange}
                />

                <label htmlFor="isPublic">isPublic: </label>
                <input 
                type="checkbox"
                name="isPublic"
                id="isPublic"
                checked={formData.isPublic}
                onChange={handleChange}
                />

                <button>Create Entry</button>
            </form>
        </div>
    )
}

export default CreateEntry