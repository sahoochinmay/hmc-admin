import {FETCH_TICKET, RELOAD_TICKET} from '../constant/ticket.constant'

const initialState = {
    ticketList: [],
    reload: 1
}

const ticketReducer = (state = initialState , action) =>{
    const {type , payload} = action
    switch (type) {
        case FETCH_TICKET:
            return {
                ...state, ticketList:payload, reload:1
            }
        case RELOAD_TICKET:
            return{
                ...state, reload: state?.reload+1
            }
        default:
            return state;
    }
}

export default ticketReducer;