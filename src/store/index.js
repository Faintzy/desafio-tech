import { createStore } from 'redux';
import Request from 'sync-request';

const INITIAL_STATE = {
    data: [],
}

function main(state = INITIAL_STATE, action) {

    switch (action.type){
        
        case 'GET_COMMENTS':

            var res = Request('GET', `http://localhost:3030/posts/${action.comment_id}/comments`);
            
            return { ...state, data: [res.getBody()] };

        default:
            return state;
    }
        
}

const store = createStore(main);

export default store;