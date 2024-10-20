import NavbarComponent from "../../components/Customer/NavbarComponent";
import KontakComponent from "../../components/Customer/KontakComponent";

import { Container, Row, Col, Card, Button } from "react-bootstrap";
import FooterComponent from "../../components/Customer/FooterComponent";

import { Link } from "react-router-dom";

import Api from "../../api";
import { useState, useEffect } from "react";

const LandingPage = () => {
    // produk API
    const [produk, setProduk] = useState([]);

    const getDataProduk = async () => {
        await Api.get('/customer/produk')
            .then((res) => {
                // console.log(res.data);
                setProduk(res.data);
            })
    }

    useEffect(() => {
        getDataProduk();
    }, [])


    return (
        <>
            <NavbarComponent isLoggedIn={false} />
            <div id="banner">
                <Container>
                    <Row>
                        <Col lg={8}>
                            <h1>Elegansi dan Produktivitas <br /> dalam satu Ruangan.</h1>
                        </Col>

                        <Col lg={4}>
                            <p className="banner-teks">Ruang tumbuh untuk bisnis meningkatkan kreatifitas dan kenyamanan saat bekerja.</p>
                        </Col>
                    </Row>
                    <Row className="banner-image mt-5 d-none d-lg-flex align-items-center">
                        <Col lg={5}>
                            <img src="../src/assets/img-hero1.png" alt="" />
                        </Col>
                        <Col lg={7} >
                            <Row>
                                <Col>
                                    <img src="../src/assets/img-hero2.png" alt="" />
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col lg={6} >
                                    <img src="../src/assets/img-hero3.png" alt="" />
                                </Col>
                                <Col lg={6} >
                                    <img src="../src/assets/img-hero4.png" alt="" />
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row className="banner-image mt-3 d-lg-none d-block align-items-center">
                        <Col>
                            <img src="../src/assets/img-hero1.png" alt="" />
                        </Col>
                    </Row>


                </Container>
            </div>

            <div id="ruangan" className="mt-5">
                <Container>
                    <Row>
                        <Col>
                            <h1 className="text-center">Temukan Ruangan yang <br /> cocok untuk Anda</h1>
                        </Col>
                    </Row>
                    <Row>
                        {
                            produk.length > 0 ?
                                produk.map((item, index) => (
                                    <Col lg={4}>
                                        <Card key={index}>
                                            <Card.Img variant="top" src={item.foto} />
                                            <Card.Body>
                                                <Row>
                                                    <Col>
                                                        <Card.Title><Link to="/ruang-meeting">{item.judul_pendek}</Link></Card.Title>
                                                    </Col>
                                                    <Col>
                                                        <p className="text-end">IDR {item.harga} / {item.satuan}</p>
                                                    </Col>
                                                </Row>
                                                <Card.Text>
                                                    Ruang meeting ideal untuk bisnis dan usaha yang ingin melakukan pertemuan atau mencari inspirasi bersama.
                                                </Card.Text>
                                                <Button variant="outline-dark">4-10 Kursi</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                                : <h3>Ruangan Tidak Tersedia</h3>
                        }

                        {/* <Col lg={4}>
                            <Card>
                                <Card.Img variant="top" src="../src/assets/img-racara.png" />
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <Card.Title><Link to="/ruang-acara">Ruang Acara</Link></Card.Title>
                                        </Col>
                                        <Col>
                                            <p className="text-end">IDR 150K / Hari</p>
                                        </Col>
                                    </Row>
                                    <Card.Text>
                                        Ruang acara untuk Workshop, seminar, dan acara lainnya. Dilengkapi dengan peralatan pendukung acara.
                                    </Card.Text>
                                    <Button variant="outline-dark">30 -150 Kursi</Button>
                                    <Button variant="outline-dark">Event Tools</Button>
                                    <Button variant="outline-dark">Sound System</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4}>
                            <Card>
                                <Card.Img variant="top" src="../src/assets/img-cospace.png" />
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <Card.Title><Link to="/cospace">Coworking Space</Link></Card.Title>
                                        </Col>
                                        <Col>
                                            <p className="text-end">IDR 15K / Jam</p>
                                        </Col>
                                    </Row>
                                    <Card.Text>
                                        Pilihan terbaik untuk anda yang ingin mencari inspirasi dan bekerja dengan nyaman.
                                    </Card.Text>
                                    <Button variant="outline-dark">Single</Button>
                                    <Button variant="outline-dark">Free Drink</Button>
                                    <Button variant="outline-dark">Free Wifi</Button>
                                </Card.Body>
                            </Card>
                        </Col> */}
                    </Row>
                </Container>
            </div>

            <KontakComponent />
            <FooterComponent />
        </>
    );
}

export default LandingPage