import React from 'react';
import './index.scss';
import Loading from 'Src/components/loading';
import ListItem from './ListItem';
import Pagation from 'Src/components/pagation';
import { connect } from 'react-redux';
import http from 'Src/utils/http';

class List extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      current: 0,
      pageSize: 10,
      total: 0,
      list: [],
      loading: true
    }
  }
  search(key, start=0, limit=10){
    http.get('/api/book/fuzzy-search', {
      params: {
        query: key,
        start: start * this.state.pageSize,
        limit: limit
      }
    }).then(data => {
      if(data.ok) {
        this.setState({
          total: data.total,
          list: data.books
        });
        this.props.onChangeLoading(false);
      }
    })
  }
  prevHandler = () => {
    if(this.state.current - 1 < 0) {
      return;
    }
    this.setState((prevState, props) => {
      return {
        current: prevState.current-1
      }
    }, () => {
      this.search(this.props.searchKey, this.state.current);
    })
  }
  nextHandler = () => {
    if(this.state.current + 1 > this.state.total) {
      return;
    }
    this.setState((prevState, props) => {
      return {
        current: prevState.current+1
      }
    }, () => {
      this.search(this.props.searchKey, this.state.current);
    })
  }
  componentDidMount () {
    this.search(this.props.searchKey);
  }
  render () {
    let ResultComponent = null;
    if (this.props.loading) {
      ResultComponent = <Loading />
    } else {
      const aLi = this.state.list.map(item => (
        <ListItem
          key={item._id}
          id={item._id}
          imgUrl={item.cover}
          title={item.title}
          author={item.author}
          type={item.cat}
          info={item.shortIntro}
        />
      ));
      ResultComponent = (
        <React.Fragment>
          <ul>{aLi}</ul>
          <Pagation current={this.state.current + 1} total={this.state.total} onPrev={this.prevHandler} onNext={this.nextHandler} />
        </React.Fragment>
      );
    }
    return (
      <div className="listbox">
        <div className="search__result">搜索结果：</div>
        {ResultComponent}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    searchKey: state.searchKey,
    loading: state.loading
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onChangeLoading: status => {
      dispatch({type: 'CHANGE_LOADING', data: !!status});
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);