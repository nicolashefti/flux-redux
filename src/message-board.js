import {combineReducers, createStore} from "redux";

export const ONLINE = 'ONLINE';
export const AWAY = 'AWAY';
export const BUSY = 'BUSY';
export const OFFLINE = 'OFFLINE';

export const UPDATE_STATUS = 'UPDATE_STATUS';
export const CREATE_NEW_MESSAGE = 'NEW_MESSAGE';

const defaultState = {
    messages: [
        {
            date: new Date('2016-10-10 10:12:10'),
            postedBy: 'Jerry',
            content: 'Hello'
        },
        {
            date: new Date('2016-10-10 10:12:10'),
            postedBy: 'Tom',
            content: 'World ;)'
        }
    ],
    userStatus: ONLINE
};

const userStatusReducer = (state = defaultState.userStatus, {type, value}) => {
    switch (type) {
        case UPDATE_STATUS:
            return value;
            break
    }

    return state;
}

const messageReducer = (state = defaultState.messages, {type, value, postedBy, date}) => {
    switch (type) {
        case CREATE_NEW_MESSAGE:
            return [{date, postedBy, content: value}, ...state];
    }

    return state;
}

const combinedReducer = combineReducers({
    userStatus: userStatusReducer,
    messages: messageReducer
});

const store = createStore(combinedReducer);

const render = () => {
    const {messages, userStatus} = store.getState();

    document.getElementById('messages').innerHTML = messages
        .sort((a, b) => b.date - a.date)
        .map(message => (
            `<div>
                ${message.postedBy}: ${message.content}
            </div>`
        )).join('');

    document.forms.newMessage.fields.disabled = (userStatus === OFFLINE);
    document.forms.newMessage.newMessage.value = '';
}

const statusUpdateAction = (value) => {
    return {
        type: UPDATE_STATUS,
        value
    }
}

const newMessageAction = (content, postedBy) => {
    const date = new Date();
    return {
        type: CREATE_NEW_MESSAGE,
        value: content,
        postedBy,
        date
    }
}

document.forms.selectStatus.addEventListener('change', (e) => {
    store.dispatch(statusUpdateAction(e.target.value));
});

document.forms.newMessage.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = e.target.newMessage.value;
    const userName = localStorage['preferences'] ? JSON.parse(localStorage['preferences']).userName : 'Jim';

    store.dispatch(newMessageAction(value, userName));
});

render();

store.subscribe(render);
