const Frame = require('../models/Frame');

const getFrame = async (req,res) => {
    const {id: frameID} = req.params;
    const frame = await Frame.findOne({_id: frameID})
    if(!frame){
        return res.status(404).json({msg: `Frame with id: ${frameID} not found`});
    }
    res.status(200).json({frame});
}

module.exports = {getFrame};