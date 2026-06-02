import omit from "lodash/omit";
import { legacy_createStore as createStore } from "redux";

// BEGIN (write your solution here)
const createNewStore = (initialState = {}) => {
    const reducer = (state = {}, action) => {
        switch (action.type) {
            case 'TASK_ADD':
                const id = action.payload.task.id
                const data = {[id]: action.payload.task};
                return {...state, ...data};
            case 'TASK_REMOVE':
                return omit(state, [action.payload.id]);
            default:
                return state;
        }
    }
    return createStore(reducer, initialState);
}
export default createNewStore;
// END
