const mongoose = require('mongoose');

const DoorStyleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide a name'],
        trim: true,
        maxlength: [30, 'name must not be longer than 30 characters']
    },
    forWO: {
        type: Boolean,
        required: [true, 'must provide weather this style is available for White Oak']
    },
    woGrain: {
        type: Array        
    },
    
});

module.exports = mongoose.model('DoorStyle', DoorStyleSchema);