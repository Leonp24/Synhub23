import NavbarComponent from "../../components/Customer/NavbarComponent";
import { Container, Row, Col, Card } from "react-bootstrap";

import Api from "../../api";
import { useEffect, useState } from "react";

import Cookies from "js-cookie";

const OrderPage = () => {
    const [pesanan, setPesanan] = useState([]);

    const token = Cookies.get('token');
    

    const getDataPesanan = async () => {
        await Api.get('/customer/pesanan', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                // console.log(res.data);
                setPesanan(res.data);
            })
    }

    useEffect(() => {
        getDataPesanan();
    }, [])

    return (
        <>
            <NavbarComponent isLoggedIn={true} />
            <div id="order">
                <Container>
                    <h1>Pesanan Anda</h1>
                    <Row>
                        <Col lg={12}>
                            {
                                pesanan.map((item) => (
                                    <Card className="mt-3">
                                        <Card.Body>
                                            <Row>
                                                <Col md={4}>
                                                    <label htmlFor="nama-pemesan">Nama Pemesan</label>
                                                    <h5>{item.user?.name}</h5>
                                                </Col>
                                                <Col md={4}>
                                                    <label htmlFor="tanggal-pemesanan">Tanggal Pemesanan</label>
                                                    <h5>{item.created_at.substring(0,10)}</h5>
                                                </Col>
                                                <Col md={4}>
                                                    <label htmlFor="waktu">Total Waktu</label>
                                                    <h5>{item.durasi + ' ' + item.produk?.satuan}</h5>
                                                </Col>
                                            </Row>
                                            <Row className="mt-3">
                                                <Col md={4}>
                                                    <label htmlFor="ruangan">Ruangan</label>
                                                    <h5>{item.produk?.judul_pendek}</h5>
                                                </Col>
                                                <Col md={4}>
                                                    <label htmlFor="status">Status</label>
                                                    <h5 className="status text-success">{item.status}</h5>
                                                </Col>
                                                <Col md={4}>
                                                    <label htmlFor="kode-reservasi">Kode Reservasi :</label>
                                                    <Card className="bg-warning text-light text-center">
                                                        <Card.Body>
                                                            <h5>{item.kode_pesanan}</h5>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>

                                ))
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default OrderPage;
