import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { ReduxState } from 'redux/combinedReducer';
import { AnyAction } from 'redux';
import { addNotificationAction } from '../redux/actions/NotificationActions';

export const PATHS = {
  EVENT: 'event',
  COMMENT: 'comment',
  USER_EVENT: 'user-event',
  USER: 'user',
};

export type ThunkActionType = ThunkAction<void, ReduxState, null, AnyAction>;

// https://seng-513.appspot.com/
const CLIENT: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001/',
});

export function postRequest(path: string, data: any): ThunkActionType {
  return (dispatch, getState) => {
    CLIENT.post(path, data, {
      headers: { Authorization: `Bearer ${getState().user.uid}` },
    })
      .then((response: AxiosResponse) => {
        dispatch(addNotificationAction(response.data, 'success'));
      })
      .catch((error: AxiosError) => {
        const message = error.response ? error.response.data : error.message;
        dispatch(addNotificationAction(message, 'error'));
      });
  };
}

export function patchRequest(path: string, data: any): ThunkActionType {
  return (dispatch, getState) => {
    CLIENT.patch(path, data, {
      headers: { Authorization: `Bearer ${getState().user.uid}` },
    })
      .then((response: AxiosResponse) => {
        dispatch(addNotificationAction(response.data, 'success'));
      })
      .catch((error: AxiosError) => {
        const message = error.response ? error.response.data : error.message;
        dispatch(addNotificationAction(message, 'error'));
      });
  };
}

export function deleteRequest(path: string, data: any): ThunkActionType {
  return (dispatch, getState) => {
    CLIENT.delete(path, {
      headers: {
        Authorization: `Bearer ${getState().user.uid}`,
      },
      data: data,
    })
      .then((response: AxiosResponse) => {
        dispatch(addNotificationAction(response.data, 'success'));
      })
      .catch((error: AxiosError) => {
        const message = error.response ? error.response.data : error.message;
        dispatch(addNotificationAction(message, 'error'));
      });
  };
}
