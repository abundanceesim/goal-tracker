// middleware for handling exceptions inside of async
// express routes and passing them to your express error handlers.
const asyncHandler = require("express-async-handler");

const Goal = require('../models/goalModel')
const User = require("../models/userModel");

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
//   Find only the goals for the logged in user
  const goals =  await Goal.find( { user: req.user.id })
  // if(!goals.length){
  //   res.status(200).json({ recordCount: goals.length, message: 'No goals added yet.' });
  // } else {
  //   res.status(200).json({ recordCount: goals.length, goals: goals });
  // }
  res.status(200).json(goals);
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
    text: req.body.text, 
    user: req.user.id
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

  // const user = await User.findById(req.user.id);

 // Check for user
  if(!req.user){
    res.status(401)
    throw new Error('User not found')
  }

//   ensure that logged in user matches goal's user
  if(goal.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('User not authorized')
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

  // const user = await User.findById(req.user.id);

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //   ensure that logged in user matches goal's user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const deletedGoal = await Goal.findOneAndDelete({_id: goalId})
  res.status(200).json({ id: req.params.id });
//  res.status(200).json({ message: `Deletion successful.`, deletedGoal: deletedGoal });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
