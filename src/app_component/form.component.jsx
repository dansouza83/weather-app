import React from "react";

import "./form.style.css";

const Form = (props) => {
  return (
    <div className="container">
      <div>{props.error ? error() : null}</div> {/** return the error or nul */}
      {/* form event submit created to load the data using the input form data -> loadweather */}
      <form onSubmit={props.loadweather}>
        <div className="row">
          <div className="col-md-3 offset-md-2">
            <input
              type="text"
              name="city"
              className="form-control"
              autoComplete="off"
              placeholder="City"
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="country"
              className="form-control"
              autoComplete="off"
              placeholder="Country"
            />
          </div>
          <div className="col-md-3 mt-md-0 py-2 text-md-left">
            <button className="btn btn-warning">Get Weather</button>
          </div>
        </div>
      </form>
    </div>
  );
};

function error() {
  return (
    <div className="alert alert-danger mx-5" role="alert">
      Please enter City and Country
    </div>
  );
}

export default Form;
