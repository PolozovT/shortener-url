import React from "react";
import "./App.css";
import {
  InputUrl,
  returnedShortUrl,
  RedirectingUrl,
  redirectingUrl
} from "./dbLayer";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      originalUrl: "",
      shortedUrl: ""
    };
  }

  render() {
    if (window.location.href === "http://localhost:3000/") {
      return (
        <div className="App">
          <header className="head">URL Reducer</header>
          <body className="body">
            <label>input your full url </label>
            <input
              className="inputs"
              type="text"
              style={{ width: "400px" }}
              value={this.state.originalUrl}
              onChange={event =>
                this.setState({ originalUrl: event.target.value })
              }
            ></input>
            <button
              type="submit"
              onClick={() => {
                InputUrl(this.state.originalUrl);
                const dbShortUrl = returnedShortUrl;
                this.setState({ shortedUrl: dbShortUrl });
              }}
            >
              double click me
            </button>
            <label>reduced url</label>
            <input
              className="inputs"
              type="text"
              style={{ width: "200px" }}
              value={this.state.shortedUrl}
              readonly="readonly"
            ></input>
          </body>
        </div>
      );
    } else {
      RedirectingUrl(window.location.href);
      return null;
    }
  }
}

export default App;
