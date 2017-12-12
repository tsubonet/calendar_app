import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default class PageDetail extends React.Component {

  static contextTypes = {
    clickToGetRootProps: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      year: this.props.year,
      month: this.props.month,
      day: this.props.day,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      year: nextProps.year,
      month: nextProps.month,
      day: nextProps.day,
    });
  }


  render() {
    return (
      <div>
        <h3>{this.state.year}年{this.state.month}月{this.state.day}日</h3>
        <hr />
        <Link to={`/month/${this.state.year}/${this.state.month}`} onClick={this.context.clickToGetRootProps}>もどる</Link>
      </div>
    );
  }
}
