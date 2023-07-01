export const IntialState={
    post:[],
    users:[],
    filterType:"",
}


export default function reducer(state,action){
    switch(action.TYPE){
        case "LOAD_POSTS":
            return {...state,post:action.payLoad};
        case "LOAD_USER":
            return {...state,users:action.payLoad}
        case "UPDATE_POST":
            return {...state,post:action.payLoad};
        case "SET_FILTERTYPE":
            console.log(action.payLoad,"action")
            return {...state,filterType:action.payLoad};
        default:
            return {...state}
    }
}