import { combineReducers } from 'redux';
import {
  CHANGE_SEARCHKEY,
  CHANGE_LOADING,
  GET_SOURCES,
  CHANGE_CURSOURCE,
  CHANGE_CHAPTERS,
  LOADING_CHAPTERS,
  CURRENT_CHAPTER
} from './actions';

function searchKey(state = '', action) {
  switch (action.type) {
    case CHANGE_SEARCHKEY:
      return action.data;
    default:
      return state;
  }
}

function loading(state = '', action) {
  switch (action.type) {
    case CHANGE_LOADING:
      return action.data;
    default:
      return state;
  }
}

function sources (state = [], action) {
  switch (action.type) {
    case GET_SOURCES:
      return action.data;
    default:
      return state;
  }
}

function cursource (state = '', action) {
  switch (action.type) {
    case CHANGE_CURSOURCE:
      return action.data;
    default:
      return state;
  }
}
function loadingChapters (state = false, action) {
  switch (action.type) {
    case LOADING_CHAPTERS:
      return action.data;
    default:
      return state;
  }
}
function chaptersInfo (
  state = {
    chapters: [],
    updated: ''
  },
  action
) {
  switch (action.type) {
    case CHANGE_CHAPTERS:
      return action.data;
    default:
      return state;
  }
}

function currentChapter (state = {}, action) {
  switch (action.type) {
    case CURRENT_CHAPTER:
      localStorage.currentChapter = JSON.stringify(action.data);
      return action.data;
    default:
      state = JSON.parse(localStorage.currentChapter || '{}');
      return state;
  }
}

const rootReducer = combineReducers({
  searchKey,
  loading,
  sources,
  cursource,
  loadingChapters,
  chaptersInfo,
  currentChapter
})

export default rootReducer;