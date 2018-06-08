import React from 'React';
import api from 'Src/api';
import './chapter.scss';

import { connect } from 'react-redux';

class Chapter extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      content: '',
      barStatus: false,
      baseFontSize: 16
    }
  }
  createMarkup = () => {
    return {
      __html: this.state.content
    }
  }
  toggleBar = () => {
    this.setState(prevState => {
      return {
        barStatus: !prevState.barStatus
      }
    });
  }
  zoomOut = (e) => {
    e.stopPropagation();
    if(this.state.baseFontSize === 12) {
      return;
    }
    this.setState((prevState) => {
      return {
        baseFontSize: prevState.baseFontSize - 4
      }
    })
  }
  zoomIn = (e) => {
    e.stopPropagation();
    if(this.state.baseFontSize === 48) {
      return;
    }
    this.setState((prevState => {
      return {
        baseFontSize: prevState.baseFontSize + 4
      }
    }));
  }
  componentDidMount () {
    const link = this.props.match.params.link;
    this.queryChapter(link);
    console.log(this.props);
  }
  queryChapter (link) {
    api.queryChapter(link).then(data => {
      let convertData = data.chapter.body.replace(/\n/g, '<br />');
      this.setState({
        content: convertData
      });
    })
  }
  render () {
    return (
      <div className={'chapter' + (this.state.barStatus ? ' active' : '')} onClick={this.toggleBar}>
        <div className="chapter__topbar"><span>←</span>章节信息</div>
        <div className="chapter__content">
          <h4>{this.props.currentChapter.title}</h4>
          <div className="content" style={{fontSize: this.state.baseFontSize + 'px'}} dangerouslySetInnerHTML={this.createMarkup()}></div>
        </div>
        <div className="chapter__bottombar">
          <span onClick={this.zoomOut}>-</span>
          <span>字体大小</span>
          <span onClick={this.zoomIn}>+</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentChapter: state.currentChapter
  }
}

export default connect(mapStateToProps)(Chapter);