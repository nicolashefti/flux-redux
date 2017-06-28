import {Store} from "./Store";

export class ReduceStore extends Store {
    constructor(dispatcher) {
        super(dispatcher);
    }

    reduce(state, action) {
        throw new Error('You should implement that');
    }

    __onDispatch(action) {
        const newSate = this.reduce(this.__state, action);

        if (newSate !== this.__state) {
            this.__state = newSate;
            this.__emitChange();
        }
    }
}
