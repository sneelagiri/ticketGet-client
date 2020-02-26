import axios from "axios";
const databaseUrl = "http://localhost:4000";

export const FETCH_COMMENTS = "FETCH_COMMENTS";

function fetchCommentsSuccess(tickets) {
  return {
    type: FETCH_COMMENTS,
    payload: tickets
  };
}

export function fetchComments() {
  return async function(dispatch, getState) {
    const response = await axios.get(`${databaseUrl}/comments`);
    // console.log("what is the response", response);
    dispatch(fetchCommentsSuccess(response.data));
  };
}

export function createComment(comment, userId, ticketId) {
  // console.log(ticket);
  return async function(dispatch, getState) {
    const response = await axios.post(`${databaseUrl}/comment`, {
      comment: comment,
      userId: userId,
      ticketId: ticketId
    });
    // console.log(response);
    dispatch(fetchCommentsSuccess(response.data));
  };
}
