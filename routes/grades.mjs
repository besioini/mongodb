import express from "express";
import Grades from "../models/Grades.mjs";
const router = express.Router();

router.post('/grades/postGrade', async(req, res) => {
  try {
    const { scores, class_id, learner_id } = req.body;

    const grade = new Grades({ scores, class_id, learner_id })

    await grade.save();
    
    res.status(200).json({
      message: 'Grade added successfully',
    })

    }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding grade' });
  }
})

// Get all grades
router.get('/grades', async (req, res) => {
    try {
        const allGrades = await Grades.find().limit(10);
        res.json(allGrades);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single grade entry
router.get('/grades/:id', async (req, res) => {
    try {
        const grade = await Grades.findById(req.params.id)
        if (!grade) {
            return res.status(404).json({ message: 'Grade not found' });
        }
        res.json(grade)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.put('/grades/updateGrade/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const grade = await Grades.findByIdAndUpdate(id, updates, { new: true });

        if (!grade) {
            return res.status(404).json({ message: 'not found' });
        }

        console.log('Successfully updated');
        res.json(grade);
    } catch (error) {
        console.log('Error updating:', error.message);
        res.status(500).json({
            message: 'Error updating',
            error: error.message
        });
    }
});

router.delete('/grades/deleteGrade/:id', async (req, res) => {
    try {
        const grade = await Grades.findByIdAndDelete(req.params.id);
        if(!grade){
            return res.status(404).json({ message: 'Grade not found' });
        }        
        console.log('Grade successfully removed');
        res.status(204).json({ message: 'Grade successfully removed' });
    }catch (error) {
        console.log('Error removing product:', error.message);
        res.status(500).json({
            message: 'Error removing product',
            error: error.message
        })
    }
});

export default router;
