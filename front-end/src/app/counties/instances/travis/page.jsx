"use client"
import { Row, Col, Container } from "react-bootstrap";
import YouTube from 'react-youtube';
import styles from "../../../page.module.css";
import "../counties.css";

export default function TravisCounty(){
    // Youtube link
    const videoId = new URLSearchParams(new URL("https://www.youtube.com/watch?v=wo0m4Lk-Ylo&ab_channel=TravisCountyTX").search).get("v");
    return (
        <main className={styles.main}>
            <div className="header">
                <h1> Travis County Information</h1>
            </div>
            <Container>
                <Row>
                    <Col>
                        {/* Image of travis county */}
                        <img className="countyimage" src="https://upload.wikimedia.org/wikipedia/commons/6/64/Travis_courthouse_2011.jpg" alt="Description of your image" />
                    </Col>
                    <Col>
                        {/* Info */}
                        <p className="paragraph">Travis County is located in Central Texas. As of the 2020 census, the population was 1,290,188. It is the fifth-most populous county in Texas. Its county seat and most populous city is Austin, the capital of Texas.</p>
                        <ul className="bullet-point">
                            <li>Population: 1,290,188</li>
                            <li>Number of Agencies: 50</li>
                            <li>Number of Foster Children: 100</li>
                            <li>Number of Foster Homes: 20</li>
                        </ul>
                    </Col>
                </Row>
                <Row>
                    {/* Youtube video placement */}
                    <div className="col-md-12 text-center mt-5">
                        <YouTube videoId={videoId} />
                    </div>
                </Row>
            </Container>

            {/* Links */}
            
            <div className="center">
                <h1>Related Links</h1>
                <h2>Organization</h2>
                <div><a href="../../../organizations/instances/austin-angels">Austin Angels</a></div>
                <h2>Resource</h2>
                <div><a href="../../../resources/instances/recognize">Recognizing and Reporting Child Abuse</a></div>
            </div>
        </main>
    )
}