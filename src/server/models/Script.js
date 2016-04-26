import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let scriptSchema = new Schema({
    name:  String,
    executableData:  String,
    type: Number
});

export default mongoose.model('Script', scriptSchema, 'Script');
