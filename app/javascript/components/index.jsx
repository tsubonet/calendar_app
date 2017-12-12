import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default class Index extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  static contextTypes = {
    clickToGetRootProps: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = { name: this.props.name };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.name,
    });
  }

  updateName = (name) => {
    this.setState({ name });
  };

  render() {
    return (
      <div>
        <h3>
          Hello, {this.state.name}!
        </h3>
        <hr />
        <form >
          <label htmlFor="name">
            Say hello to:
          </label>
          <input
            id="name"
            type="text"
            value={this.state.name}
            onChange={(e) => this.updateName(e.target.value)}
          />
        </form>
        <Link to="/">top</Link>
        <hr />
        <Link to="/hello_world/show" onClick={this.context.clickToGetRootProps}>show</Link>
      </div>
    );
  }
}
