const mongoose = require('mongoose');

const DoorSchema = new mongoose.Schema({
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
    hinges: {
        type: Number,
        required: [true, 'must provide the amount of hinges required for the frame']
    },
    glass: {
        type: Number
    }
});

module.exports = mongoose.model('Door', DoorSchema);