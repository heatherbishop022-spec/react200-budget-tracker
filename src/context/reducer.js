export const initialState = {
    incomes: [],
    expenses: []
};

export function appReducer(state, action) {
    switch (action.type) {
        case 'ADD_INCOME':
            return {
                ...state,
                incomes: [...state.incomes, action.payload]
            };
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: [...state.expenses, action.payload]
            };
        case 'UPDATE_INCOME':
            return {
                ...state,
                incomes: state.incomes.map((item, i) =>
                    i === action.payload.index ? action.payload.entry : item
                )
            };
        case 'UPDATE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.map((item, i) =>
                    i === action.payload.index ? action.payload.entry : item
                )
            };
        case 'DELETE_INCOME':
            return {
                ...state,
                incomes: state.incomes.filter((_, i) => i !== action.payload)
            };
        case 'DELETE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.filter((_, i) => i !== action.payload)
            };
        default:
            return state;
    }
}