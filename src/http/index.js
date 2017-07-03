import {generate as id} from "shortid";

const asyncAwaitTime = 1500;

export const get = (url, callback) => {
    setTimeout(() => {
        callback(id());
    }, asyncAwaitTime);
};
