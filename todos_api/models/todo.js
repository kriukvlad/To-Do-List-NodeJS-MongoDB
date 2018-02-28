var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is not valid!'
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_data: {
        type: Date,
        default: Date.now
    }
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;


