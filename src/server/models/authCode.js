import mongoose from 'mongoose';

const modelName = 'AuthCode';
let Schema = mongoose.Schema;
let authCodeSchema = new Schema({
    value: { type: String, required: true },
    redirectUri: { type: String, required: true },
    userId: { type: String, required: true },
    clientId: { type: String, required: true }
});

export default mongoose.model(modelName, authCodeSchema, modelName);
