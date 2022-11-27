const DoorStyle = require('../models/DoorStyle');

const getDoorStyle = async (req,res) => {
    const {id: doorStyleID} = req.params;
    const doorStyle = await DoorStyle.findOne({_id: doorStyleID})
    if(!doorStyle){
        return res.status(404).json({msg: `doorStyle with id: ${doorStyleID} not found`});
    }
    res.status(200).json({doorStyle});
}

module.exports = {getDoorStyle};