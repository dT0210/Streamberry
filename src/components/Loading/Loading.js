import "./Loading.css"
import React from "react"
import {Audio} from "react-loader-spinner";

function Loading({ addStyle, LoaderStyle }) {
    return (
      <div className="loading" style={addStyle}>
        <Audio
          height="80"
          width="80"
          radius="1"
          color="#e50914"
          ariaLabel="loading"
          style={LoaderStyle}
        />
      </div>
    );
  }
  
  export default Loading;