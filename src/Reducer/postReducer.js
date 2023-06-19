export const IntialState={
    post:[],
    users:[],
    filterType:""
}


export default function reducer(state,action){
    switch(action.TYPE){
        case "LOAD_POSTS":
            return {...state,post:action.payLoad};
        case "UPDATE_POST":
            return {...state,post:action.payLoad};
        case "SET_FILTERTYPE":
            return {...state,filterType:action.payLoad}
        default:
            return {...state}
    }
}