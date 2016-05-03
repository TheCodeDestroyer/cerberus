import mongoose from 'mongoose';
import eventEmitter from '../middleware/eventEmitter';

const modelName = 'ShellLog';
let Schema = mongoose.Schema;
let shellLogSchema = new Schema({
    processId:  Number,
    shellName:  String,
    timestamp: Number,
    output:   String
});

shellLogSchema.post('save', (shellLog) => {
    eventEmitter.emit(`cerberus:${modelName}:created`, shellLog);
});

export default mongoose.model(modelName, shellLogSchema, modelName);
