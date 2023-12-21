export default {

  load: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/start" });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        dispatch({
          type: "comments/load-success",
          payload: {
            data: {
              count: res.data.result.count,
              items: res.data.result.items,
            },
          },
        });
      } catch (e) {
        dispatch({ type: "comments/error" });
      }
    };
  },

  send: (id, text, type) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/start" });

      try {
        const res = await services.api.request({
          url: 'api/v1/comments',
          method: 'POST',
          headers: {'X-Token': localStorage.getItem('token')},
          body: JSON.stringify({
            text,
            parent: { _id: id, _type: type }
          })
        });
        dispatch({
          type: "comments/send-success",
          payload: {comment: res.data.result} 
        });
        console.log('success')
      } catch (e) {
        dispatch({ type: "comments/error" });
        console.log('error')
      }
    };
  }
};