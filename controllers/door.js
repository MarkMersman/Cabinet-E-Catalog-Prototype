const Door = require('../models/Door');

const getDoor = async (req,res) => {
    const {id: doorID} = req.params;
    const door = await Door.findOne({_id: doorID})
    if(!door){
        return res.status(404).json({msg: `Door with id: ${doorID} not found`});
    }
    res.status(200).json({door});
}

module.exports = {getDoor};