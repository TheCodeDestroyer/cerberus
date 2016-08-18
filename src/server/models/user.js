import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const modelName = 'User';
let Schema = mongoose.Schema;
let userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String,  required: true }
});

//TODO: Fix this crap...somehow
userSchema.methods.verifyPassword = function(password, cb) {
    let user = this;

    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) { return cb(err); }
        return cb(null, isMatch);
    });
};

//TODO: Clean those returns up!!!
userSchema.pre('save', function(cb) {
    let user = this;

    if (!user || !user.isModified('password')) { return cb(); }

    bcrypt.genSalt(5, (saltErr, salt) => {
        if (saltErr) { return cb(saltErr); }

        bcrypt.hash(user.password, salt, null, (hashErr, hash) => {
            if (hashErr) { return cb(hashErr); }
            user.password = hash;
            return cb();
        });

        return cb();
    });

    return cb();
});

export default mongoose.model(modelName, userSchema, modelName);
