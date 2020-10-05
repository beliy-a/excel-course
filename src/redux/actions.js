import {TABLE_RESIZE, CHANGE_TEXT, CHANGE_STYLE,
  APPLY_STYLE, CHANGE_TABLE_NAME, OPENED_DATE} from './types';

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  };
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data,
  };
}

export function changeStyles(data) {
  return {
    type: CHANGE_STYLE,
    data,
  };
}

export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data,
  };
}

export function changeTableName(data) {
  return {
    type: CHANGE_TABLE_NAME,
    data,
  };
}

export function openedDate() {
  return {
    type: OPENED_DATE,
  };
}
