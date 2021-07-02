const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PostSchema = new Schema({
    address: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
    },
    user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
})

module.exports = mongoose.model('posts', PostSchema) // 'posts' is name colection 