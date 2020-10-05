import {defaultStyles} from '@core/constants';
import {clone} from '@core/utils';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  currentText: '',
  tableName: 'Новая таблица',
  openedDate: new Date().toJSON(),
};

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
});

export const normalizeInitialState = state => {
  return state ? normalize(state) : clone(defaultState);
};
