import mongoose from 'mongoose';

const modelName = 'ApplicationClient';
let Schema = mongoose.Schema;
let applicationClientSchema = new Schema({
    name: { type: String, unique: true, required: true },
    clientId: { type: String, required: true },
    secret: { type: String, required: true },
    userId: { type: String, required: true }
});

export default mongoose.model(modelName, applicationClientSchema, modelName);
