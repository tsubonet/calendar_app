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

  addDayClass(i) {
    switch (i){
      case 5:
        return 'sat';
        break;
      case 6:
        return 'sun';
        break;
      default:
        return null;
    }
  }

  render() {
    const days = ['月','火','水','木','金','土','日'];
    return (
      <div>
        <table>
          <tbody>
            <tr>
            {(() => {
              return days.map((day, i) => {
                return (
                  <td className={this.addDayClass(i)} key={i}>{day}</td>
                )
              });
            })()}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
