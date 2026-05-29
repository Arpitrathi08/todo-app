
const express = require("express");

const router = express.Router();

const Task = require("../models/Task");

const authMiddleware = require("../middleware/authMiddleware");


// CREATE TASK
router.post("/", authMiddleware, async (req, res) => {

    try {

        const { title , category , priority , dueDate } = req.body;

        const newTask = await Task.create({

            title: title,
            category: category,
            priority: priority,
            dueDate: dueDate,
            userId: req.user.id

        });

        res.status(200).json(newTask);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// GET TASKS
router.get("/", authMiddleware, async (req, res) => {

    try {

        const tasks = await Task.find({
            userId: req.user.id
        });

        res.status(200).json(tasks);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// DELETE TASK
router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        await Task.findByIdAndDelete(req.params.id);

        res.json({
            message: "Task deleted"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// UPDATE TASK
router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        task.completed = !task.completed;

        await task.save();

        res.json(task);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});

module.exports = router;



