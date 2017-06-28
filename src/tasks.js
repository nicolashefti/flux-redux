import {generate as id} from "shortid";
import {Dispatcher, ReduceStore} from "./flux";

const taskDispatcher = new Dispatcher();

class TaskStore extends ReduceStore {
    getInitialState() {
        return {
            task: [
                {
                    id: id(),
                    content: "Update DB",
                    completed: false
                },
                {
                    id: id(),
                    content: "Do this",
                    completed: false
                },
                {
                    id: id(),
                    content: "Do that",
                    completed: true
                },
            ],
            showComplete: true
        }
    }

    reduce(state, action) {
        console.log('Reducing...', state, action);
        return state;
    }

    getState() {
        return this.__state;
    }
}

const taskStore = new TaskStore(taskDispatcher);

taskDispatcher.dispatch('TEST');
