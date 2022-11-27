const Material = require('../models/material');

const getMaterial = async (req,res) => {
    const {id: materialID} = req.params;
    const material = await Material.findOne({_id: materialID})
    if(!material){
        return res.status(404).json({msg: `material with id: ${materialID} not found`});
    }
    res.status(200).json({material});
}

module.exports = {getMaterial};