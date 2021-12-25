import React from "react"

const Video = ({ videoSrcURL, ...props }) => (
  <div className="video">
    <iframe
      id="iframe"
      src={videoSrcURL}
      title={""}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allowFullScreen
    />
  </div>
)
export default Video
