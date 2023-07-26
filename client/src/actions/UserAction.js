import * as UserApi from "../api/UserRequest.js"

export const updateUser = (id, formData) => async (dispatch) => {
    dispatch({ type: "UPDATING_START" });
    try {
      const { data } = await UserApi.updateUser(id, formData);
      console.log("Action Received: ", data);
      dispatch({ type: "UPDATING_SUCCESS", data: data });
    } catch (error) {
      dispatch({ type: "UPDATING_FAIL" });
    }
  };
  
  // Add a new action to delete the user account
  export const deleteUserAccount = (id, callback) => async (dispatch) => {
    try {
      // Call the backend API to delete the user account
      await UserApi.deleteUser(id);
  
      // Invoke the callback function to handle redirection
      callback();
  
      // You can also dispatch a success action here if needed
    } catch (error) {
      console.error("Error deleting account:", error);
      // Handle any errors here if needed
    }
  };
  export const getFollowingStatus = (followerId, followingId) => async (dispatch) => {
    try {
      dispatch({ type: "FOLLOW_STATUS_REQUEST" });
      const response = await UserApi.getFollowingStatus(followerId, followingId);
      dispatch({ type: "FOLLOW_STATUS_SUCCESS", payload: response.data });
    } catch (error) {
      console.error("Error fetching following status:", error);
      dispatch({ type: "FOLLOW_STATUS_FAIL" });
    }
  };

export const followUser = (data) => async (dispatch) => {
    dispatch({type: "FOLLOW_USER"})
    UserApi.followUser(data.followerId, data);
}

export const unFollowUser = (data) => async (dispatch) => {
    dispatch({type: "UNFOLLOW_USER"})
    UserApi.unFollowUser(data.followerId, data);
}