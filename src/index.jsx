var React = require('react');
var ReactDOM = require('react-dom');

var style = require('./style.sass')

class MyComponent extends React.Component {
  render() {
    return <div>Hello World</div>;
  }
}

ReactDOM.render(<MyComponent />, document.getElementById("root"));
