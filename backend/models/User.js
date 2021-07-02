const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    private_key: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('users', UserSchema) // 'users' is name colection 