const mongoose = require('mongoose');

const FrameSchema = new mongoose.Schema({
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
    screws: {
        type: Number,
        required: [true, 'must provide the amount ofscrews required for the frame']
    }
});

module.exports = mongoose.model('Frame', FrameSchema);