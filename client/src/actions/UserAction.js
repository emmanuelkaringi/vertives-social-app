import * as UserApi from "../api/UserRequest.js"

export const updateUser = (id, formData)=> async(dispatch) =>{
    dispatch({type: "UPDATING_START"})
    try {
        const {data} = await UserApi.updateUser(id, formData);
        console.log("Action Received : ",data)
        dispatch({type: "UPDATING_SUCCESS", data: data})
    } catch (error) {
        dispatch({type: "UPDATING_FAIL"})
        
    }
}

export const followUser = (data) => async (dispatch) => {
    dispatch({type: "FOLLOW_USER"})
    UserApi.followUser(data.followerId, data);
}

export const unFollowUser = (data) => async (dispatch) => {
    dispatch({type: "UNFOLLOW_USER"})
    UserApi.unFollowUser(data.followerId, data);
}