import api from "./api"

async function getMyEntries(){
    const response = await api.get('/entries/my-entries')
    return response.data
}

async function getPublicEntries(){
    const response = await api.get('/entries')
    return response.data
}

async function getEntryById(entryId){
    const response = await api.get(`/entries/${entryId}`)
    return response.data
}

async function createEntry(entryData){
    const response = await api.post('/entries', entryData)
    return response.data
}

async function updateEntry(entryId, entryBody){
    const response = await api.put(`/entries/${entryId}`, entryBody)
    return response.data
}

async function deleteEntry(entryId){
    const response = await api.delete(`/entries/${entryId}`)
    return response.data
}

export {
    getMyEntries,
    getPublicEntries,
    getEntryById,
    createEntry,
    updateEntry,
    deleteEntry
}
