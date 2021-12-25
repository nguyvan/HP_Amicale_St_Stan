import React from "react"
import Helmet from "react-helmet"

export default () =>
  <div>
    <Helmet>
      <html lang="fr" />
      {/* <!-- Primary Meta Tags --> */}
      <title>Amicale St Stan votre premier réseau d’entraide, professionnel et amicale.</title>
      <meta name="title" content="Amicale St Stan votre premier réseau d’entraide, professionnel et amicale." />
      <meta name="description" content="Depuis plus de 130 ans, nous sommes aux côtés des anciens élèves et professeurs de Saint Stanislas de Nantes. Rejoignez-nous !" />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://amicaleststan.fr/" />
      <meta property="og:title" content="Amicale St Stan votre premier réseau d’entraide, professionnel et amicale." />
      <meta property="og:description" content="Depuis plus de 130 ans, nous sommes aux côtés des anciens élèves et professeurs de Saint Stanislas de Nantes. Rejoignez-nous !" />
      <meta property="og:image" content="https://amicaleststan.fr/amicale_metatags.png" />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://amicaleststan.fr/" />
      <meta property="twitter:title" content="Amicale St Stan votre premier réseau d’entraide, professionnel et amicale." />
      <meta property="twitter:description" content="Depuis plus de 130 ans, nous sommes aux côtés des anciens élèves et professeurs de Saint Stanislas de Nantes. Rejoignez-nous !" />
      <meta property="twitter:image" content="https://amicaleststan.fr/amicale_metatags.png" />
    </Helmet>
  </div>