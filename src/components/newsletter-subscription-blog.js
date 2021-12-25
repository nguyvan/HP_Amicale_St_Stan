import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"
import addToMailchimp from 'gatsby-plugin-mailchimp'


class NewsletterSubscriptionBlog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {email: "", error: undefined, subscribed: false};
  }

  handleEmailChange(event) {
    this.setState({email: event.currentTarget.value, error: "", subscribed: false})
  }

  handleEmailSubmit(event) {
    event.preventDefault();

    const {email} = this.state;

    addToMailchimp(email)
      .then(data => {
        if (data.result === "error") {
          throw data;
        }

        this.setState({subscribed: true, email: ""})
        window.dataLayer.push({
          'event': 'mailchimp_subscription'
        })
        setTimeout(() => {
          this.setState({subscribed: false})
        }, 6000);
      })
      .catch(error => {
        this.setState({error: error.msg})
      });

  }

  render() {

    const {data: {conditions, titre, cta, placeholder, politiqueConfidentialite, description}} = this.props;
    const {error, email, subscribed} = this.state;

    return (
      <div id="newsletter-subscription-blog">
        <h3>{titre}</h3>
        <p>{description}</p>
        <form onSubmit={(event) => this.handleEmailSubmit(event)} className={`form ${error && "error"}`}>
          <input placeholder={placeholder}
                 name="email"
                 type="email"
                 value={email}
                 onChange={(event) => this.handleEmailChange(event)}
                 className={`input ${error && "error"}`}
          />
          <button type="submit" className={`button ${error && "error"}`} disabled={subscribed}>{!subscribed ? cta.texte : <CheckMarkIcon/>}</button>
          {error && <div className="error-message" dangerouslySetInnerHTML={{ __html: error }} />}
        </form>
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
            description
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
      <NewsletterSubscriptionBlog data={data.allContentfulNewsletter.nodes[0]} />
    )}
  />
)

NewsletterSubscriptionBlog.propTypes = {
  data: PropTypes.object.isRequired,
}

const CheckMarkIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.00016 16.1698L4.83016 11.9998L3.41016 13.4098L9.00016 18.9998L21.0002 6.99984L19.5902 5.58984L9.00016 16.1698Z"
      fill="#FaFaFA"
    />
  </svg>
);
