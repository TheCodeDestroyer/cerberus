import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const modelName = 'User';
let Schema = mongoose.Schema;
let userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String,  required: true }
});

//TODO: Fix this crap
userSchema.methods.verifyPassword = function(password, cb) {
    let user = this;

    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) { return cb(err); }
        cb(null, isMatch);
    });
};

userSchema.pre('save', function(cb) {
    let user = this;

    if (!user || !user.isModified('password')) { return cb(); }

    bcrypt.genSalt(5, (err, salt) => {
        if (err) { return cb(err); }

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) { return cb(err); }
            user.password = hash;
            cb();
        });
    });
});

export default mongoose.model(modelName, userSchema, modelName);
