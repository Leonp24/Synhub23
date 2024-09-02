import NavbarComponent from "../components/NavbarComponent";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { useState } from "react";

const OrderPage = () => {
    const [orderStatus, setOrderStatus] = useState("initial");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleBayarClick = () => {
        setOrderStatus("paid");
    };

    const handleHapusClick = () => {
        setOrderStatus("deleted");
        setShow(false);
    };

    const renderContent = () => {
        switch (orderStatus) {
            case "initial":
                return (
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Body>
                                    <Row>
                                        <Col md={4}>
                                            <label htmlFor="nama-pemesan">Nama Pemesan</label>
                                            <h5>Ahmad Fulan</h5>
                                        </Col>
                                        <Col md={4}>
                                            <label htmlFor="tanggal-pemesanan">Tanggal Pemesanan</label>
                                            <h5>01/08/2024</h5>
                                        </Col>
                                        <Col md={4}>
                                            <label htmlFor="waktu">Waktu/Total Jam</label>
                                            <h5>09 : 00 / 3 Jam</h5>
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col md={4}>
                                            <label htmlFor="ruangan">Ruangan</label>
                                            <h5>Ruang Meeting</h5>
                                        </Col>
                                        <Col md={4}>
                                            <label htmlFor="status">Status</label>
                                            <h5 className="status text-success">Lunas</h5>
                                        </Col>
                                        <Col md={4}>
                                            <button className="btn btn-teal w-100 mb-3" onClick={handleBayarClick}>
                                                Bayar
                                            </button>
                                            <Button variant="danger w-100" onClick={handleShow}>
                                                Hapus
                                            </Button>

                                            <Modal show={show} onHide={handleClose} centered>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Yakin Ingin Menghapus?</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose}>
                                                        Batal
                                                    </Button>
                                                    <Button variant="danger" onClick={handleHapusClick}>
                                                        Ya, Hapus
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                );
            case "paid":
                return (
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <Card.Body>
                                    <Row>
                                        <Col md={4}>
                                            <label htmlFor="nama-pemesan">Nama Pemesan</label>
                                            <h5>Ahmad Fulan</h5>
                                        </Col>
                                        <Col md={4}>
                                            <label htmlFor="tanggal-pemesanan">Tanggal Pemesanan</label>
                                            <h5>01/08/2024</h5>
                                        </Col>
                                        <Col md={4}>
                                            <label htmlFor="waktu">Waktu/Total Jam</label>
                                            <h5>09 : 00 / 3 Jam</h5>
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col md={4}>
                                            <label htmlFor="ruangan">Ruangan</label>
                                            <h5>Ruang Meeting</h5>
                                        </Col>
                                        <Col md={4}>
                                            <label htmlFor="status">Status</label>
                                            <h5 className="status text-success">Lunas</h5>
                                        </Col>
                                        <Col md={4}>
                                            <label htmlFor="kode-reservasi">Kode Reservasi :</label>
                                            <div className="kode-reservasi">
                                                <h4>SYB1234567</h4>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                );
            case "deleted":
                return (
                    <Row>
                        <Col>
                            <h5 className="mt-3">Yahh.. belum ada Pesanan 🙄</h5>
                        </Col>
                    </Row>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <NavbarComponent isLoggedIn={true} />
            <div id="order">
                <Container>
                    <h1>Pesanan Anda</h1>
                    {renderContent()}
                </Container>
            </div>
        </>
    );
}

export default OrderPage;
