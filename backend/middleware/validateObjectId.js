const mongoose = require('mongoose')
function validateObjectId(req,res,next){
if (!mongoose.Types.ObjectId.isValid(req.params.entryId)) {
      return res.status(404).json({ message: "No entry matching id provided" });
    }
next()
}

module.exports = validateObjectId