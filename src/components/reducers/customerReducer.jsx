function customerReducer(state, action) {
    switch (action.type) {
        case "setCustomer": {
            return {
                data: {
                    ...state,
                    [action.field]: action.payload

                }

            }
        }

        case "addCustomer": {
            return {
                ...state,
                custumers: [state.data ],
                // [state.firstname]: "",
                // [state.lastname]: "",
                // [state.email]: "",
                // [state.phone]: "",
                // id: state.customers.length + 1, 

            };

        }

        default:
            return state
    }


}

export default customerReducer