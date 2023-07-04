const express = require('express')
const router = express.Router()
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controllers/goalController')

// Method 1 - the most condensed format
router.route('/').get(getGoals).post(setGoal)

router.route('/:id').delete(deleteGoal).put(updateGoal);

module.exports = router;

// Method 2 - routes with controller:
// router.get("/", getGoals);
// router.get("/", setGoal);
// router.get("/:id", updateGoal);
// router.get("/:id", deleteGoal);

// Method 3 - routes without controller:
// router.post("/", (req, res) => {
//   res.status(200).json({ message: "Set goal" });
// });

// router.put("/:id", (req, res) => {
//   res.status(200).json({ message: `Update goal ${req.params.id}` });
// });

// router.delete("/:id", (req, res) => {
//   res.status(200).json({ message: `Delete goal ${req.params.id}` });
// });

