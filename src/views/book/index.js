import React from 'React';
import api from 'Src/api';
import Loading from 'Src/components/loading';
import { Link } from 'react-router-dom';
import './index.scss';

import { connect } from 'react-redux';
import { setSourcesAsync, setCurrentChapter } from 'Src/redux/actions';

class Book extends React.Component{
  constructor (props) {
    super(props);
  }
  componentDidMount () {
    if(this.props.chaptersInfo.chapters.length === 0) {
      const id = this.props.match.params.id;
      this.props.dispatch(setSourcesAsync(id))
    }
  }
  enterChapter (item, index, e) {
    this.props.dispatch(setCurrentChapter({
      title: item.title,
      index: index
    }));
  }
  /*componentDidUpdate(prevProps, prevState) {
    if (this.props.cursource !== prevProps.cursource) {
      this.queryChapters(this.props.cursource);
    }
  }*/
  render () {
    let ResultComponent = null;
    if (this.props.loadingChapters) {
      ResultComponent = <Loading />
    } else {
      ResultComponent = (
        <React.Fragment>
          <p>最后更新时间：{this.props.chaptersInfo.updated && new Date(this.props.chaptersInfo.updated).toLocaleString()}</p>
          <ul className="pure-menu-list chapters-list">
            {
              this.props.chaptersInfo.chapters.map((item, index) => (
                <li className="pure-menu-item" key={encodeURIComponent(item.link)}><Link to={'/chapter/' + encodeURIComponent(item.link)} className="pure-menu-link" onClick={(e) => {this.enterChapter(item, index, e)}} >{item.title}</Link></li>
              ))
            }
          </ul>
        </React.Fragment>
      );
    }
    return (ResultComponent);
  }
}
const mapStateToProps = state => {
  return {
    loadingChapters: state.loadingChapters,
    chaptersInfo: state.chaptersInfo
  }
}

export default connect(mapStateToProps)(Book);