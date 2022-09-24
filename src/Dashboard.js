import React from "react";
import axios from "axios";
import "./Dashboard.css";

const dummy = "https://static.thenounproject.com/png/625182-200.png";
class MultipleImageUpload extends React.Component {
  logout = () => {
    axios.get("/logout").then(() => this.props.history.push("/"));
  };
  state = { current: null, old: [] };
  uploadImage = (e) => {
    const { current, old } = this.state;

    this.setState(
      {
        current: URL.createObjectURL(e.target.files[0])
      },
      () => {
        this.setState({ old: [...old, current] });
      }
    );

    this.setState({ current: URL.createObjectURL(e.target.files[0]) });
  };
  render() {
    console.log(this.state);
    const { old, current } = this.state;
    return (
      <div className="App">
        <a className="logout" onClick={this.logout}>
          Logout
        </a>
        <div>
          <h3>Current</h3>
          <img
            src={current ? current : dummy}
            alt="Add your file"
            style={{ height: 100, width: 100 }}
          />
        </div>
        <hr />
        {old
          ? old.map((o, i) => (
              <img
                src={o ? o : dummy}
                key={i.toString()}
                alt="preview"
                style={{ height: 100, width: 100 }}
              />
            ))
          : ""}

        <input type="file" onChange={this.uploadImage} />
      </div>
    );
  }
}
export default MultipleImageUpload;
