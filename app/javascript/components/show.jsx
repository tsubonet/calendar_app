import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default class Show extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  static contextTypes = {
    transitTo: PropTypes.func,
  }

  constructor(props) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { name: this.props.name };
    this.getRootProps = this.getRootProps.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.name,
    });
  }

  getRootProps(e) {
    this.context.transitTo(e.currentTarget.href, { pushState: true });
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
            Show Say hello to:
          </label>
          <input
            id="name"
            type="text"
            value={this.state.name}
            onChange={(e) => this.updateName(e.target.value)}
          />
        </form>
        <Link to="/hello_world" onClick={this.getRootProps}>hello_world</Link>
      </div>
    );
  }
}
