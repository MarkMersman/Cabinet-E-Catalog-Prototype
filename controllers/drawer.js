const Drawer = require('../models/drawer');

const getDrawer = async (req,res) => {
    const {id: drawerID} = req.params;
    const drawer = await Drawer.findOne({_id: drawerID})
    if(!drawer){
        return res.status(404).json({msg: `drawer with id: ${drawerID} not found`});
    }
    res.status(200).json({drawer});
}

module.exports = {getDrawer};