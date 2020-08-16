const createStore = (reducer, initialState = []) => {
    let state = initialState;

    return {
        dispatch: (action) => {
            state = reducer(state, action);

            // Could be better if we subscribe to state change
            rerender(state);
        },
        getState: () => state,
    };
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: state.length,
                    task: action.task,
                    completed: false,
                },
            ];
        case 'TOGGLE_TODO':
            return state.map((todo) => {
                if (todo.id === action.id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            });
        case 'DELETE_TODO':
            return state.filter((_, i) => action.id !== i);
    }
};

const { getState, dispatch } = createStore(reducer);
