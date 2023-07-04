// middleware for handling exceptions inside of async
// express routes and passing them to your express error handlers.
const asyncHandler = require("express-async-handler");

const Goal = require('../models/goalModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals =  await Goal.find()
  if(!goals.length){
    res.status(200).json({ recordCount: goals.length, message: 'No goals added yet.' });
  } else {
    res.status(200).json({ recordCount: goals.length, goals: goals });
  }
});

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  console.log(req.body);
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const goal = await Goal.create({
    text: req.body.text
  })
  res.status(200).json({ message: 'Goal added successfully!', goal: goal });
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if(!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
  res.status(200).json({ message: `Goal updated successfully!`, updatedGoal: updatedGoal });
});

// @desc    Delete goals
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  const goalId = req.params.id
  if(!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }
  const deletedGoal = await Goal.findOneAndDelete({_id: goalId})
 res.status(200).json({ message: `Deletion successful.`, deletedGoal: deletedGoal });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
