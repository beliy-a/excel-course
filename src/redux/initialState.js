import {storage} from '@core/utils';
import {defaultStyles} from '@core/constants';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  currentText: '',
  tableName: 'Новая таблица',
};

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
});

export const initialState = storage('excel-state') ?
    normalize(storage('excel-state')) :
    defaultState;
