import * as React from "react"
import Layout from "../components/layout";
import PageHeader from "../components/page-header";
import Filtre from "../components/news-anciens-date-filter";
import Reasons from "../components/reasons";
import Form from "../components/form-post-announcement";

const history = (props) => {
    const path = props.location ? props.location.pathname : null;
    return (
        <Layout path={path}>
            <PageHeader data={"News des Anciens"}></PageHeader>
            <div className="row" style={{marginTop: "50px", marginBottom: "200px"}}>
                <div className="col-sm-8">
                    <Filtre />
                </div>
                <div className="col-sm-4" style={{minWidth: "411px", alignSelf: "center"}}>
                    <Form />
                </div>
            </div>
            <Reasons />
        </Layout>
    )
}

export default history;