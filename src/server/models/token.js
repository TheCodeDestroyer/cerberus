import mongoose from 'mongoose';

const modelName = 'Token';
let Schema = mongoose.Schema;
let tokenSchema = new Schema({
    value: { type: String, required: true },
    userId: { type: String, required: true },
    clientId: { type: String, required: true }
});

export default mongoose.model(modelName, tokenSchema, modelName);
