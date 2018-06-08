import api from 'Src/api';
export const CHANGE_SEARCHKEY = 'CHANGE_SEARCHKEY';
export function changeSearchKey (key, ...args) {
  return {
    type: CHANGE_SEARCHKEY,
    data: key
  }
}

export const CHANGE_LOADING = 'CHANGE_LOADING';
export function changeLoading (bool) {
  return {
    type: CHANGE_LOADING,
    data: bool
  }
}

export const GET_SOURCES = 'GET_SOURCES';
export function getSources (sources) {
  return {
    type: GET_SOURCES,
    data: sources
  }
}

export const CHANGE_CURSOURCE = 'CHANGE_CURSOURCE';
export function changeCursource (sid) {
  return {
    type: CHANGE_CURSOURCE,
    data: sid
  }
}

export const CHANGE_CHAPTERS = 'CHANGE_CHAPTERS';
export function changeChapters (obj) {
  return {
    type: CHANGE_CHAPTERS,
    data: {
      chapters: obj.chapters,
      updated: obj.updated
    }
  }
}

export const LOADING_CHAPTERS = 'LOADING_CHAPTERS';
export function changeLoadingChapters (bool) {
  return {
    type: LOADING_CHAPTERS,
    data: bool
  }
}

export function setSourcesAsync (bookid) {
  return (dispatch, getState) => {
    dispatch(changeLoadingChapters(true));
    return api.querySources(bookid).then(data => {
      dispatch(getSources(data))
      dispatch(changeCursource(data[1]._id))
      return data[1]._id;
    }).then(source_id => dispatch(fetchChapters(source_id)));
  }
}

export function fetchChapters (source_id) {
  return (dispath, getState) => {
    return api.queryChapters(source_id).then(data => {
      dispath(changeChapters({chapters: data.chapters, updated: data.updated}));
      dispath(changeLoadingChapters(false));
    })
  }
}

export const CURRENT_CHAPTER = 'CURRENT_CHAPTER';
export function setCurrentChapter (chapter) {
  return {
    type: CURRENT_CHAPTER,
    data: chapter
  }
}