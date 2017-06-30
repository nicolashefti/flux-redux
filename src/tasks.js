import {generate as id} from "shortid";
import {Dispatcher, ReduceStore} from "./flux";

const taskDispatcher = new Dispatcher();

const CREATE_TASK = 'CREATE_TASK';
const COMPLETE_TASK = 'COMPLETE_TASK';
const SHOW_TASKS = 'SHOW_TASKS';

const createNewTaskAction = (content) => {
    return {
        type: CREATE_TASK,
        value: content
    }
};

const showTaskAction = (show) => {
    return {
        type: SHOW_TASKS,
        value: show
    }
};

const completeTaskAction = (id, isComplete) => {
    return {
        type: COMPLETE_TASK,
        id,
        value: isComplete
    }
};

class TaskStore extends ReduceStore {
    getInitialState() {
        return {
            tasks: [
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
        switch (action.type) {
            case CREATE_TASK:
                newState = {...state, tasks: [...state.tasks]};
                newState.tasks.push({
                    id: id(),
                    content: action.value,
                    complete: false
                });
                return newState;
                break;
            case SHOW_TASKS:
                newState = {
                    ...state,
                    tasks: [...state.tasks],
                    showComplete: action.value
                };
                return newState;
                break;
            case COMPLETE_TASK:
                newState = {...state, tasks: [...state.tasks]};
                const affectedElementIndex = newState.tasks.findIndex(t => t.id === action.id);

                if (affectedElementIndex > -1) {
                    newState.tasks[affectedElementIndex] = {
                        ...state.tasks[affectedElementIndex],
                        completed: action.value
                    }
                    return newState;
                } else {
                    return state;
                }
        }
        console.log('Reducing...', state, action);
        let newState;

        return state;
    }

    getState() {
        return this.__state;
    }
}

const TaskComponent = ({content, completed, id}) => (
    `<section>
        ${content} <input type="checkbox" 
            name="taskCompleteCheck" data-taskid=${id}
            ${completed ? "checked" : ""}>
    </section>`
);

document.forms.undo.addEventListener('submit', (e) => {
    e.preventDefault();
    taskStore.revertLastState();
});

const render = () => {
    const taskSection = document.getElementById('tasks');
    const state = taskStore.getState();
    const rendered = state.tasks
        .filter(task => state.showComplete ? true : !task.completed)
        .map(TaskComponent).join('');

    taskSection.innerHTML = rendered;

    document.getElementsByName('taskCompleteCheck').forEach(element => {
        element.addEventListener('change', (e) => {
            const id = e.target.attributes['data-taskid'].value;
            const checked = e.target.checked;
            taskDispatcher.dispatch(completeTaskAction(id, checked));
        });
    });
};

document.forms.newTask.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.newTaskName.value;
    if (name) {
        taskDispatcher.dispatch(createNewTaskAction(name));

        e.target.newTaskName.value = null;
    }
});

document.getElementById('showComplete').addEventListener('change', ({target}) => {
    const showComplete = target.checked;
    taskDispatcher.dispatch(showTaskAction(showComplete));
});

const taskStore = new TaskStore(taskDispatcher);

taskDispatcher.dispatch('TEST');

taskStore.addListener(() => {
    render();
});

render();
