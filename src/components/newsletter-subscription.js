import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"
import addToMailchimp from 'gatsby-plugin-mailchimp'

import Underline from "../assets/underline.svg"
import Success from "../assets/success.svg"
import Error from "../assets/error.svg"
import Modal from "./modal"

class NewsletterSubscription extends React.Component {

  constructor() {
    super();

    this.state = {isModalOpened: false, isDisabledSubmit: false, submissionStatus: <></>};
  }

  handleSubmit(value) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!re.test(value)) {
      this.setState({isModalOpened: true});
      return
    }

    this.setState({isDisabledSubmit: true, submissionStatus: <></>})


    addToMailchimp(value)
      .then(data => {
        if (data.result && data.result === "error") {
          this.setState({isDisabledSubmit: false, submissionStatus: <Error/>})
          return
        }
        this.setState({isDisabledSubmit: false, submissionStatus: <Success/>})
        window.dataLayer.push({
          'event': 'mailchimp_subscription'
        })
      })
  }

  handleInputChange(value) {

    const {submissionStatus} = this.state;

    if ((value === null || value === "") && submissionStatus !== <></>) {
      this.setState({submissionStatus: <></>})
    }

  }

  render() {
    const {data: {conditions, titre, cta, placeholder, politiqueConfidentialite}} = this.props;
    const {isModalOpened, isDisabledSubmit, submissionStatus} = this.state;

    return (
      <div id="newsletter-subscription">
        <div className="title">
          <h2>{titre}</h2>
          <Underline className="shape"/>
        </div>
        <div className="fake-input">
            <input type="email" id="email" placeholder={placeholder} onChange={(e) => this.handleInputChange(e.target.value)}/>
            <div className="submission-status">{submissionStatus}</div>
            <button className="button button--animated" onClick={() => this.handleSubmit(document.getElementById("email").value)} disabled={isDisabledSubmit}><span>{cta.texte}</span></button>
        </div>
        <div className="conditions">
          <span>{conditions}</span>
          <Link to={"mentions-legales"}>{politiqueConfidentialite}</Link>
        </div>
        {isModalOpened && <Modal
          onClose={() => this.setState({isModalOpened: false})}
          message="Veuillez entrer une adresse mail valide"
        />}
      </div>
    )
  }
}

export default ({ data }) => (
  <StaticQuery
    query={graphql`
      {
        allContentfulNewsletter {
          nodes {
            titre
            placeholder
            politiqueConfidentialite
            conditions
            cta {
              texte
              lien
              couleur
            }
          }
        }
      }
    `}
    render={data => (
      <NewsletterSubscription data={data.allContentfulNewsletter.nodes[0]} />
    )}
  />
)

NewsletterSubscription.propTypes = {
  data: PropTypes.object.isRequired,
}
