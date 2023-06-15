export const IntialState={
    post:[],
}


export default function reducer(state,action){
    switch(action.TYPE){
        case "LOAD_POSTS":
            console.log("here");
            return {...state,post:action.payLoad};
        default:
            return {...state}
    }
}