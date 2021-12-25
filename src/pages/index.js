import React from "react"
import Layout from "../components/layout"
import Reasons from "../components/reasons"
import Statistics from "../components/statistics"
import Formulas from "../components/formulas"
import Missions from "../components/missions"
import Entreprises from "../components/entreprises"
import HeadingSection from "../components/heading-section"

export default function Home(props) {

  const path = props.location ? props.location.pathname : null;
  return (
    <Layout path={path}>
      <HeadingSection />
      <Entreprises />
      <Reasons />
      <Statistics />
      <Formulas />
      <Missions />
    </Layout>
  )
}
