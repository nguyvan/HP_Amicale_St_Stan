import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"
import NewsletterSubscription from "./newsletter-subscription"

const Footer = ({ data, hideNewsletter }) => {

  const handleClick = () => {
    document.getElementById("newsletter-subscription").scrollIntoView(true);
  }

  return (
    <>
      { !hideNewsletter && <NewsletterSubscription id="newsletter-subscription"/>}
      <div id="footer">
        { !hideNewsletter && (
          <div className="footer--section newsletter">
            <h2 dangerouslySetInnerHTML={{ __html: data.titre }} />
            <div className="button-contact-us">
              <img srcSet={data.cta.icone.file.url} alt={data.cta.icone.description} className="img"/>
              <span to={data.cta.lien} onClick={() => handleClick()}>{data.cta.texte}</span>
            </div>
          </div>
        )}
        <div className="footer--section content">
          <div className="column description">
            <div className="logo-container">
              <img srcSet={data.logo.file.url} alt="" className="logo"/>
            </div>
            <p>{data.description}</p>
          </div>
          <div className="column links">
            <h5>{data.planDuSite}</h5>
            <ul id="links-container">
              {data.pages.map((object, i) => (
                <li key={i}>
                  <Link to={object.path}>{object.texte}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="column social-media">
            <h5>{data.reseauxSociaux}</h5>
            {data.reseauxSociauxIcone.map((object, i) => (
              <a href={object.path} key={i}>
                <img srcSet={object.icone.file.url} alt={object.icone.description} />
              </a>
            ))}
          </div>
        </div>
        <div className="footer--section legals">
          <p>{data.copyrights}</p>
          <Link to={data.mentionsLegales.path}>{data.mentionsLegales.texte}</Link>
        </div>
      </div>
    </>
)}

export default ({ data, hideNewsletter }) => (
  <StaticQuery
    query={graphql`
      query FooterQuery {
        allContentfulFooter {
          nodes {
            titre
            description
            copyrights
            planDuSite
            logo {
                description
                file {
                  url
                }
            }
            reseauxSociaux
            reseauxSociauxIcone {
              path
              icone {
                description
                file {
                  url
                }
              }
            }
            pages {
              path
              texte
            }
            mentionsLegales {
              texte
              path
            }
            cta {
              texte
              lien
              couleur
              icone {
                description
                file {
                  url
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Footer data={data.allContentfulFooter.nodes[0]} hideNewsletter={hideNewsletter} />}
  />
)

Footer.propTypes = {
  data: PropTypes.object.isRequired,
}
