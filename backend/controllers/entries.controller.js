const Entry = require("../models/Entry")


async function createEntry(req, res){
        try{
            const {title, entryBody, isPublic} = req.body
            const createdEntry = await Entry.create({
                title,
                entryBody,
                isPublic,
                owner: req.user._id
            })
            res.status(201).json(createdEntry)
        } catch(err){
            if(err.name === 'ValidationError'){
                return res.status(400).json({message: err.message})
            }
            if(err.code === 11000){
                return res.status(409).json({message: 'An entry with this name already exists'})
            }
            console.log(err)
            res.status(500).json({message: 'Internal Server Error'})
        }
}

async function getAllEntries(req, res){
    try{
        const allEntries = await Entry.find()
        res.status(200).json(allEntries)
        } catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal Server Error'})
        }
}

async function getEntryById(req, res){
    try{
        const foundEntry = await Entry.findById(req.params.entryId)
        if(!foundEntry){
            return res.status(404).json({message: 'Entry Not Found'})
        }
        res.status(200).json(foundEntry)
        } catch(err){
            console.log(err)
            res.status(500).json({message: 'Internal Server Error'})
        }

}

async function getMyEntries(req, res) {
    try {
        const myEntries = await Entry.find({ owner: req.user._id })


        res.status(200).json(myEntries)
    } catch (err) {
        console.log(err)
    }
}

async function updateEntry(req, res){
    try{    
        const {title, entryBody, isPublic} = req.body
        const updatedEntry = await Entry.findByIdAndUpdate(req.params.entryId,
            {
                title, 
                entryBody, 
                isPublic,
            }, 
            {returnDocument: 'after', runValidators: true})
        if(!updatedEntry){
            return res.status(404).json({message: 'Internal Server Error'})
        } 
        res.status(200).json(updatedEntry)
        } catch(err){
            console.log(err)
            res.status(500).json({message: 'Internal Server Error'})
        }

}

async function deleteEntry(req, res){
    try{
        const foundEntry = await Entry.findById(req.params.entryId)
        if(String(foundEntry.owner) !== String(req.user._id)){
            return res.status(403).json({message: "This is not your entry!"})
        }
        await Entry.findByIdAndDelete(req.params.entryId)
        res.sendStatus(204)
        } catch(err){
            console.log(err)
            res.status(500).json({message: 'Internal Server Error'})
        }

}

module.exports = {
    createEntry,
    getAllEntries,
    getEntryById,
    getMyEntries,
    updateEntry,
    deleteEntry
}