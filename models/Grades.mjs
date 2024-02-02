import mongoose from 'mongoose';

const GradesSchema = mongoose.Schema({
    scores: [Number],
    class_id: Number,
    learner_id: Number
})

const Grades = mongoose.model('Grades', GradesSchema, 'grades'); 

export default Grades;