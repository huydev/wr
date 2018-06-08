import http from 'Src/utils/http';
/**
 * 根据书籍id查询可用源
 * @param {*} book_id 
 */
function querySources (book_id) {
  return http.get('/api/toc?view=summary&book='+book_id)
}
/**
 * 根据可用源id查询章节
 * @param {*} source_id 
 */
function queryChapters (source_id) {
  return http.get('/api/toc/' + source_id + '?view=chapters')
}

function queryChapter (link) {
  return http.get('http://chapter2.zhuishushenqi.com/chapter/' + link + '?k=2124b73d7e2e1945&t=1468223717')
}

export default {
  querySources,
  queryChapters,
  queryChapter
}