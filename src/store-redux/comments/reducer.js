export const initialState = {
  data: {
    count: 0,
    items: [],
  },
  waiting: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/start":
      return {...state, data: {...state.data}, comment: {}, waiting: true};

    case "comments/error":
      return {...state, data: {...state.data}, comment: {}, waiting: false};

    case "comments/load-success":
      return { ...state, data: action.payload.data, waiting: false };

    case "comments/send-success":
      return {
        ...state,
        data: {
          ...state.data,
          count: state.data.count + 1,
          items: [...state.data.items, action.payload.data],
        },
        waiting: false,
      };

    default:
      return state;
  }
}

export default reducer;