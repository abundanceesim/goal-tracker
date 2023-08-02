import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";

function GoalItem({ goal }) {
  const dispatch = useDispatch();
  const created = new Date(goal.createdAt).toLocaleString("en-US");

  return (
    <div className="goal">
      <div>{created}</div>
      <h3>{goal.text}</h3>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
        X
      </button>
    </div>
  );
}

export default GoalItem;
