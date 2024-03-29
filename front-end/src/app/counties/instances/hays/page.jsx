"use client"
import { Row, Col, Container } from "react-bootstrap";
import YouTube from 'react-youtube';
import styles from "../../../page.module.css";
import "../counties.css";
import Image from "next/image";

export default function HaysCounty(){
    // Youtube
    const videoId = new URLSearchParams(new URL("https://www.youtube.com/watch?v=8ymjC8Up-Rk&ab_channel=KVUE").search).get("v");
    return (
        <main className={styles.main}>
            <div className="header">
                <h1> Hays County Information</h1>
            </div>
            <Container>
                <Row>
                    <Col>
                        {/* Image */}
                        <img className="countyimage" src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Hays_courthouse.jpg" alt="Description of your image" />
                    </Col>
                    <Col>
                        <p className="paragraph">Hays County is a county in the central portion of the U.S. state of Texas. It is part of the Austin-Round Rock metropolitan area. As of the 2020 census, its official population had reached 241,067. The county seat is San Marcos.</p>
                        <ul className="bullet-point">
                            <li>Population: 241,067</li>
                            <li>Number of Agencies: 50</li>
                            <li>Number of Foster Children: 100</li>
                            <li>Number of Foster Homes: 20</li>
                        </ul>
                    </Col>
                </Row>
                <Row>
                    {/* Youtube link */}
                    <div className="col-md-12 text-center mt-5">
                        <YouTube videoId={videoId} />
                    </div>
                </Row>

            </Container>

            {/* Links */}
            
            <div className="center">
                <h1>Related Links</h1>
                <h2>Organization</h2>
                <div><a href="../../../organizations/instances/foster-village">Foster Village</a></div>
                <h2>Resource</h2>
                <div><a href="../../../resources/instances/childrenscenter">Childrens Center</a></div>
            </div>
        </main>
    )
}