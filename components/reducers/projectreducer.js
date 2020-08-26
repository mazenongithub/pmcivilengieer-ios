import { PROJECT } from '../actions/types';

export default function (state = {}, action) {

    switch (action.type) {
        case PROJECT:
            return action.payload;
        default:
            return state;
    }
}