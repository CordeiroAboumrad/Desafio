import mongoose from 'mongoose';
import dotenv from 'dotenv';

const dotEnv = dotenv.config();

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        require:true,
        // Valida se a nota inserida é menor do que 0
        validate(value){
            if(value<0) throw new Error("Valor negativo para a nota não permitido.");
        }
    },
    lastModified: {
        type: Date,
        default: Date.now()
    }
});

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;

const studentModel = mongoose.model('student', studentSchema);

export { db, studentModel };
