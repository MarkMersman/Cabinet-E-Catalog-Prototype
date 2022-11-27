const mongoose = require('mongoose');

const DrawerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide a name'],
        trim: true,
        maxlength: [30, 'name must not be longer than 30 characters']
    },
    wood: {
        type: Number,
        required: [true, 'must provide the amount of wood required for the frame']
    },
    metalBrackets: {
        type: Number,
        required: [true, 'must provide the number of metal brackets required for the frame']
    },
    drawerSlides: {
        type: Number,
        required: [true, 'must provide the number of drawer slides required for the frame']        
    }
});

module.exports = mongoose.model('Drawer', DrawerSchema);