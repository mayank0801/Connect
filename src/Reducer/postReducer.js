export const IntialState={
    post:[],
    users:[],

}


export default function reducer(state,action){
    switch(action.TYPE){
        case "LOAD_POSTS":
            return {...state,post:action.payLoad};
        default:
            return {...state}
    }
}