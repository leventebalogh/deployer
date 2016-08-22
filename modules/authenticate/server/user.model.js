const mongoose = require('mongoose');
const utils = require('core/server/utils');
const registry = require('core/server/registry');
const database = registry.get('database:mongodb');
const UserSchema = new mongoose.Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: Date,
    updatedAt: Date
});

UserSchema.pre('save', function UserPreSave(next) {
    const user = this;

    setDates(user);
    hashPassword(user);
    next();
});

module.exports = database.model('User', UserSchema);

function setDates(user) {
    const date = new Date();

    user.updatedAt = date;

    if (!user.createdAt) {
        user.createdAt = date;
    }
}

function hashPassword(user) {
    if (user.isModified('password')) {
        user.password = utils.hash(user.password);
    }
}
