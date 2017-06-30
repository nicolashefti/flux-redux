import {createStore} from "redux";

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
    userStatus: 'ONLINE'
};

const store = createStore((state = defaultState) => {
    return state;
});

const render = () => {
    const {messages, userStatus} = store.getState();

    document.getElementById('messages').innerHTML = messages
        .sort((a, b) => b.date - a.date)
        .map(message => (
            `<div>
                ${message.postedBy}: ${message.content}
            </div>`
        )).join('');
}

render();
