export const initialState = {
  data: {
    count: 0,
    items: [],
  },
  comment: {},
  waiting: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/start":
      return {...state, data: {}, comment: {},waiting: true};

    case "comments/error":
      return {...state, data: {}, comment: {}, waiting: false};

    case "comments/load-success":
      return { ...state, data: action.payload.data, waiting: false };

    case "comments/send-success":
      return { ...state, comment: action.payload.comment, waiting: false };

    default:
      return state;
  }
}

export default reducer;