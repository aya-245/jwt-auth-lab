const router = require('express').Router()
const {standardLimiter} = require("../middleware/rateLimiters")
const validateObjectId = require('../middleware/validateObjectId')
const entriesController = require('../controllers/entries.controller')
const verifyToken = require('../middleware/verifyToken')

// create
router.post('/', verifyToken, entriesController.createEntry)

// read
router.get('/', standardLimiter, entriesController.getAllEntries)

router.get('/my-entries', verifyToken, entriesController.getMyEntries)

// details
router.get('/:entryId', verifyToken, validateObjectId, entriesController.getEntryById)

// update
router.put('/:entryId', verifyToken ,entriesController.updateEntry)

// delete
router.delete('/:entryId', verifyToken, entriesController.deleteEntry)


module.exports = router