import {
  MODAL_SHOW,
  MODAL_HIDE
} from './actions';

const initialState = {
  show: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case MODAL_SHOW:
      return {
        show: true,
        ...action.modal
      }
    case MODAL_HIDE:
      return {
        show: false
      }
    default:
      return state
  }
}

export default reducer;

export const getModal = (state) => state.modal;
