import React from "react"
import { FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon } from "react-share"

const Share = ({ url, title }) => (
  <div className="post-social">
    <FacebookShareButton url={url} quote={title}>
      <FacebookIcon size={32} round={false}/>
    </FacebookShareButton>
    <LinkedinShareButton url={url} title={title} summary={""}>
      <LinkedinIcon size={32} round={false}/>
    </LinkedinShareButton>
    <TwitterShareButton url={url} title={title}>
      <TwitterIcon size={32} round={false}/>
    </TwitterShareButton>
    <WhatsappShareButton url={url} title={title}>
      <WhatsappIcon size={32} round={false}/>
    </WhatsappShareButton>
  </div>
)

export default Share