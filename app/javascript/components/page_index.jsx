import React from 'react';
import Link from './link';

export default class PageIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = { name: this.props.name };
    const today      = new Date();
    const todayYear  = today.getFullYear(); // 今日の「年」(4 桁までの年)
    const todayMonth = today.getMonth();    // 今日の「月」(0-11)
    const todayDate  = today.getDate();	    // 今日の「日」(1-31)

  }


  updateName = (name) => {
    this.setState({ name });
  };

  render() {
    return (
      <div>
      write some code !
      </div>
    );
  }
}
