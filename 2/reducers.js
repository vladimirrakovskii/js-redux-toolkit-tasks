import _ from "lodash";
import { combineReducers } from "redux";

const comments = (state = {}, action) => {
  // BEGIN (write your solution here)
  switch (action.type) {
    case 'TASK_COMMENT_ADD':
      const id = action.payload.comment.id
      const data = {[id]: action.payload.comment};
      return {...state, ...data};
    case 'TASK_COMMENT_REMOVE':
      return _.omit(state, [action.payload.id]);
    case 'TASK_REMOVE':
      return _.omitBy(state, (comment) => comment.taskId === action.payload.id);
    default:
        return state;
  }
  // END
};

const tasks = (state = {}, action) => {
  // BEGIN (write your solution here)
switch (action.type) {
    case 'TASK_ADD':
      const id = action.payload.task.id
      const data = {[id]: action.payload.task};
      return {...state, ...data};
    case 'TASK_REMOVE':
      return _.omit(state, [action.payload.id]);
    default:
      return state;
  }
  // END
};

export default combineReducers({
  comments,
  tasks,
});
