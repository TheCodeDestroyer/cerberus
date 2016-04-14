import mongoose from 'mongoose';
import eventEmitter from '../middleware/eventEmitter';

let Schema = mongoose.Schema;
let shellLogSchema = new Schema({
    processId:  Number,
    shellName:  String,
    timestamp: Number,
    output:   String
});

shellLogSchema.post('save', (shellLog) => {
    eventEmitter.emit('cerberus:ShellLog:created', shellLog);
});

export default mongoose.model('ShellLog', shellLogSchema, 'ShellLog');
