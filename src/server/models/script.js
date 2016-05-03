import mongoose from 'mongoose';

const modelName = 'Script';
let Schema = mongoose.Schema;
let scriptSchema = new Schema({
    name:  String,
    executableData:  String,
    type: Number
});

export default mongoose.model(modelName, scriptSchema, modelName);
