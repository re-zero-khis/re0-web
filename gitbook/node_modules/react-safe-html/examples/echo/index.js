var React = require('react');
var ReactDOM = require('react-dom');
var ReactSafeHtml = require('../../');

const INITIAL_HTML = `
<h1>Hello</h1>
<p>
  Attributes like onload aren't passed through by default
  <img src="https://placehold.it/100x16/ffaadd" onload="alert('hax')">
</p>
<p>
  The default &lt;a&gt; behavior sanatizes urls
  <a href="javascript:alert('xss');">hax0r</a>
  <a href="https://google.com">okay</a>
</p>
`.trim();

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      html: INITIAL_HTML,
    };
  }
  render() {
    return (
      <div style={{fontSize: '16px'}}>
        <div>
          <textarea value={this.state.html} onChange={(e) => this.setState({html: e.target.value})} style={{width: '500px', height: '500px', fontSize: '1em'}} />
        </div>
        <div style={{border: '1px dashed #666', padding: '0.5em', display: 'inline-block'}}>
          <ReactSafeHtml html={this.state.html} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));


