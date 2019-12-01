/* eslint-disable no-console */
/* eslint-disable consistent-return */

const LOCALSTORAGE = {
    set(value) {
        localStorage.setItem('notes', JSON.stringify(value));
    },

    get(key) {
        try {
            const serializedState = localStorage.getItem(key);

            return serializedState === null
                ? undefined
                : JSON.parse(serializedState);
        } catch (err) {
            console.error('Get state error: ', err);
        }
    },
};

export default LOCALSTORAGE;
