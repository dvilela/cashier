export const MODAL_SHOW = 'cashier/modal/SHOW';
export const MODAL_HIDE = 'cashier/modal/HIDE';

export const showModal = (modal) => (dispatch) =>
  dispatch({
    type: MODAL_SHOW,
    modal
  });

export const closeModal = (id) => (dispatch) =>
  dispatch({
    type: MODAL_HIDE,
    id
  });
