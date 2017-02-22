import type {Action} from "../actions/types";
import {SET_INDEX, SET_SHOP} from "../actions/shopList";

export type State = {
    shopId: string
}

const initialState = {
    activeShopId: "",
};

export default function (state: State = initialState, action: Action): State {
    if (action.type === SET_SHOP) {
        return {
            ...state,
            shopId: action.payload,
        };
    }
    return state;
}
