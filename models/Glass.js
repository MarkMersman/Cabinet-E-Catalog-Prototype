const mongoose = require('mongoose');

const GlassSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide a name'],
        trim: true,
        maxlength: [30, 'name must not be longer than 30 characters']
    },
    pricePerUnit: {
        type: Number,
        required: [true, 'must provide the price per unit for the glass']
    }
});

module.exports = mongoose.model('Glass', GlassSchema);