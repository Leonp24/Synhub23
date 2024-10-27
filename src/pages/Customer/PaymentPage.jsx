import NavbarComponent from "../../components/Customer/NavbarComponent";

import { Container, Row, Col, Form } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Api from "../../api";

const PaymentPage = () => {
    const [pesanan, setPesanan] = useState({});

    const token = Cookies.get('token');
    const { kodePesanan } = useParams();

    const getDetailDataPesanan = async () => {
        await Api.get(`/customer/pesanan/${kodePesanan}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            // console.log(res.data)
            setPesanan(res.data);
        }).catch((err) => {
            console.log(err.response.data)
        })
    }

    useEffect(() => {
        getDetailDataPesanan();
    }, []);

    return (
        <>
            <NavbarComponent isLoggedIn={true} />
            <div id="payment">
                <Container>
                    <Row>
                        <Col>
                            <h1>Pembayaran</h1>
                        </Col>
                    </Row>

                    <div className="form-bayar">
                        <form action="/success">
                            <Row>
                                <Col lg={4}>
                                    <Form.Group>
                                        <Form.Label>Kode Pesanan</Form.Label>
                                        <Form.Control type="text" name="nama-pemesan" value={pesanan.kode_pesanan} disabled />
                                    </Form.Group>
                                </Col>
                                <Col lg={4}>
                                    <Form.Group>
                                        <Form.Label>Tanggal Pesan</Form.Label>
                                        <Form.Control type="text" name="tanggalPemesanan" value={pesanan.created_at} disabled />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4}>
                                    <Form.Group>
                                        <Form.Label>Ruangan</Form.Label>
                                        <Form.Control type="text" name="ruangan" value={pesanan.produk?.judul_pendek} disabled />
                                    </Form.Group>
                                </Col>
                                <Col lg={4}>
                                    <Form.Group>
                                        <Form.Label>Total Waktu</Form.Label>
                                        <Form.Control type="text" name="waktu" value={pesanan.durasi + " " + pesanan.produk?.satuan} disabled />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={4}>
                                    <Form.Group>
                                        <Form.Label>Metode Pembayaran</Form.Label>
                                        <Form.Control type="text" value={pesanan.bayar?.nama_pembayaran} disabled />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <label htmlFor="total-bayar">Total Bayar</label>
                                    <h5>
                                        <b>IDR {pesanan.produk?.harga} x {pesanan.durasi + " " + pesanan.produk?.satuan} = IDR {pesanan.produk?.harga * pesanan.durasi}</b>
                                    </h5>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={8}>
                                    <button className="btn btn-teal w-100 mt-5" type="submit">Konfirmasi</button>
                                </Col>
                            </Row>

                        </form>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default PaymentPage