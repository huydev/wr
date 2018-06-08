import React, { Component } from 'react';
import './index.scss';
import http from 'Src/utils/http';
import { connect } from 'react-redux';
import { changeSearchKey } from 'Src/redux/actions';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: ''
    }
  }
  keyHandler = (e) => {
    this.setState({
      key: e.target.value
    });
  }
  submitHandler = (e) => {
    const key = this.state.key.trim();
    this.props.onChangeKey(key);
    this.props.history.push('/list');
    e.preventDefault();
  }
  componentWillMount () {
    this.setState({
      key: this.props.searchKey || ''
    });
  }
  componentDidMount () {
    console.log(this.props);
  }
  render () {
    return (
      <div className="search">
        <div className="search__hd">React Reader</div>
        <div className="search__bd">
          <form className="pure-form" onSubmit={this.submitHandler}>
              <input type="text" className="pure-input-rounded" value={this.state.key} onChange={this.keyHandler} placeholder="请输入小说名字" />
              <button type="submit" className="pure-button pure-button-primary">Search</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchKey: state.searchKey
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeKey: key => {
      dispatch(changeSearchKey(key));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);