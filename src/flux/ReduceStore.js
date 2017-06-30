import {Store} from "./Store";

export class ReduceStore extends Store {
    constructor(dispatcher) {
        super(dispatcher);
        this.__history = [];
    }

    reduce(state, action) {
        throw new Error('You should implement that');
    }

    revertLastState() {
        if (this.__history.length > 0) {
            this.__state = this.__history.pop();
        }

        this.__emitChange();
    }

    __onDispatch(action) {
        const newSate = this.reduce(this.__state, action);

        if (newSate !== this.__state) {
            this.__history.push(this.__state);
            this.__state = newSate;
            this.__emitChange();
        }
    }
}
