import { skyConstants } from '../_constants';

export function sky(state = {}, action) {
  switch (action.type) {
    case skyConstants.GET_ALL_STATES_SUCCESS:
      return {
        items: action.states
      };
    default:
      return state
  }
}
