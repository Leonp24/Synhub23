import NavbarComponent from "../../components/Customer/NavbarComponent";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import KontakComponent from "../../components/Customer/KontakComponent";
import FooterComponent from "../../components/Customer/FooterComponent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import Api from "../../api";

import { useParams, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import toast from "react-hot-toast";


const RoomPage = () => {

    // get data token
    const namaPemesan = Cookies.get('name');
    const telepon = Cookies.get('phone');
    const token = Cookies.get('token');

    // set detail produk
    const { slug } = useParams();
    const [produk, setProduk] = useState({});

    // inisialisasi
    const [bayar, setBayar] = useState([]);
    const [pembayaran, setPembayaran] = useState('');
    const [selectPembayaran, setSelectPembayaran] = useState('');
    const [tanggalMulai, setTanggalMulai] = useState('');
    const [tanggalSelesai, setTanggalSelesai] = useState('');
    const [waktuMulai, setWaktuMulai] = useState('');
    const [waktuSelesai, setWaktuSelesai] = useState('');
    const [perusahaan, setPerusahaan] = useState('');
    const [keterangan, setKeterangan] = useState('');

    const [jumlahOrang, setJumlahOrang] = useState('2');
    const handleJumlahChange = (e) => {
        setJumlahOrang(e.target.value);
    };

    
    const times = ['09.00', '10.00', '11.00', '12.00', '13.00', '14.00', '15.00', '16.00', '17.00'];
    const availableEndTimes = times.filter(time => time > waktuMulai);

    const getDetailDataProduk = async () => {
        await Api.get(`/customer/produk/${slug}`)
            .then((res) => {
                setProduk(res.data);
            })
    }

    const getDataPembayaran = async () => {
        await Api.get('/customer/bayar')
            .then((res) => {
                // console.log(res.data);
                setBayar(res.data);
            })
    }


    const [validation, setValidation] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validasi
        const formData = new FormData();
        formData.append('produk', produk.id);
        formData.append('tanggal_1', tanggalMulai);
        formData.append('tanggal_2', tanggalSelesai);
        formData.append('jam_1', waktuMulai);
        formData.append('jam_2', waktuSelesai);
        formData.append('bayar', pembayaran);
        formData.append('perusahaan', perusahaan);
        formData.append('jumlah_orang', jumlahOrang);
        formData.append('keterangan', keterangan);

        // console.log(produk.id, tanggal, waktuMulai, waktuSelesai, pembayaran, perusahaan, jumlahOrang, keterangan);

        
        await Api.post('/customer/pesanan', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                // console.log(res.data.message);
                if (res.status == 201) {
                    toast.success(res.data.message, {
                        duration: 3000,
                        position: 'top-center',
                    });
                    navigate("/payment");
                }
            })
            .catch((err) => {
                // console.log(err.response.data);
                setValidation(err.response.data);
            })
    }

    useEffect(() => {
        getDetailDataProduk();
        getDataPembayaran();
    }, [slug])

    const handleFormProduk = () => {
        switch (slug) {
            case 'ruang-meeting':
                return (
                    <>
                        <div className="info-pemesan">
                            <Row>
                                <Col lg={4}>
                                    <Form.Group>
                                        <Form.Label>Nama Perusahaan/Industri</Form.Label>
                                        <Form.Control type="text" name="nama-perusahaan" placeholder="cth. PT. ABC" value={perusahaan} onChange={(e) => setPerusahaan(e.target.value)} />
                                    </Form.Group>
                                    {
                                        validation.perusahaan && (
                                            <p className="text-danger mt-2" role="alert">
                                                <FontAwesomeIcon icon={faTriangleExclamation} />  {validation.perusahaan}
                                            </p>
                                        )
                                    }
                                </Col>
                                <Col lg={4}>
                                    <Form.Group>
                                        <Form.Label>Jumlah Orang</Form.Label>
                                        <Form.Control type="number" name="jumlah-orang" value={jumlahOrang} min={2} max={10} onChange={handleJumlahChange} />
                                    </Form.Group>
                                    {
                                        validation.jumlah_orang && (
                                            <p className="text-danger mt-2" role="alert">
                                                <FontAwesomeIcon icon={faTriangleExclamation} />  {validation.jumlah_orang}
                                            </p>
                                        )
                                    }
                                </Col>
                            </Row>
                        </div>

                        <div className="info-meeting mt-5">
                            <h5 className="title">Informasi Meeting</h5>
                            <Row>
                                <Col lg={4}>
                                    <Form.Group>
                                        <Form.Label>Pilih Tanggal</Form.Label>
                                        <Form.Control type="date" name="tanggal" onChange={(e) => setTanggalMulai(e.target.value)}/>
                                    </Form.Group>
                                    {
                                        validation.tanggal_1 && (
                                            <p className="text-danger mt-2" role="alert">
                                                <FontAwesomeIcon icon={faTriangleExclamation} />  {validation.tanggal_1}
                                            </p>
                                        )
                                    }
                                </Col>
                                <Col lg={2}>
                                    <Form.Group>
                                        <Form.Label>Waktu Mulai</Form.Label>
                                        <Form.Select aria-label="waktu-mulai" onChange={(e) => setWaktuMulai(e.target.value)} required>
                                            <option>--</option>
                                            {times.map((time, index) => (
                                                <option key={index} value={time}>
                                                    {time}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    {
                                        validation.jam_1 && (
                                            <p className="text-danger mt-2" role="alert">
                                                <FontAwesomeIcon icon={faTriangleExclamation} />  {validation.jam_1}
                                            </p>
                                        )
                                    }
                                </Col>
                                <Col lg={2}>
                                    <Form.Group>
                                        <Form.Label>Sampai</Form.Label>
                                        <Form.Select aria-label="sampai" onChange={(e) => setWaktuSelesai(e.target.value)} disabled={!waktuMulai} required>
                                            <option>--</option>
                                            {availableEndTimes.map((time, index) => (
                                                <option key={index} value={time}>
                                                    {time}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    {
                                        validation.jam_2 && (
                                            <p className="text-danger mt-2" role="alert">
                                                <FontAwesomeIcon icon={faTriangleExclamation} />  {validation.jam_2}
                                            </p>
                                        )
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={8}>
                                    <Form.Group>
                                        <Form.Label>Ada Kebutuhan Lain?</Form.Label>
                                        <Form.Control as="textarea" name="deskripsi" rows={3} onChange={(e) => setKeterangan(e.target.value)} />
                                    </Form.Group>
                                    {
                                        validation.keterangan && (
                                            <p className="text-danger mt-2" role="alert">
                                                <FontAwesomeIcon icon={faTriangleExclamation} />  {validation.keterangan}
                                            </p>
                                        )
                                    }
                                </Col>
                            </Row>
                        </div>
                    </>
                );

            case 'ruang-acara':
                return (
                    <>
                        <div className="info-pemesan">
                            <Row>
                                <Col lg={4}>
                                    <Form.Group>
                                        <Form.Label>Nama Perusahaan/Industri</Form.Label>
                                        <Form.Control type="text" name="nama-perusahaan" placeholder="cth. PT. ABC" value={perusahaan} onChange={(e) => setPerusahaan(e.target.value)}/>
                                    </Form.Group>
                                    {
                                        validation.perusahaan && (
                                            <p className="text-danger mt-2" role="alert">
                                                <FontAwesomeIcon icon={faTriangleExclamation} />  {validation.perusahaan}
                                            </p>
                                        )
                                    }
                                </Col>
                                <Col lg={4}>
                                    <Form.Group>
                                        <Form.Label>Jumlah Orang</Form.Label>
                                        <Form.Control type="number" name="jumlah-orang" min={2} max={10} value={jumlahOrang} onChange={handleJumlahChange}/>
                                    </Form.Group>
                                    {
                                        validation.jumlah_orang && (
                                            <p className="text-danger mt-2" role="alert">
                                                <FontAwesomeIcon icon={faTriangleExclamation} />  {validation.jumlah_orang}
                                            </p>
                                        )
                                    }
                                </Col>
                            </Row>
                        </div>

                        <div className="info-acara mt-5">
                            <h5 className="title">Informasi Acara</h5>
                            <Row>
                                <Col lg={4}>
                                    <Form.Group>
                                        <Form.Label>Tanggal Mulai</Form.Label>
                                        <Form.Control type="date" name="tanggalMulai" onChange={(e) => setTanggalMulai(e.target.value)}  />
                                    </Form.Group>
                                    {
                                        validation.tanggal_1 && (
                                            <p className="text-danger mt-2" role="alert">
                                                <FontAwesomeIcon icon={faTriangleExclamation} />  {validation.tanggal_1}
                                            </p>
                                        )
                                    }
                                </Col>
                                <Col lg={4}>
                                    <Form.Group>
                                        <Form.Label>Tanggal Selesai</Form.Label>
                                        <Form.Control type="date" name="tanggalSelesai" onChange={(e) => setTanggalSelesai(e.target.value)}  />
                                    </Form.Group>
                                    {
                                        validation.tanggal_2 && (
                                            <p className="text-danger mt-2" role="alert">
                                                <FontAwesomeIcon icon={faTriangleExclamation} />  {validation.tanggal_2}
                                            </p>
                                        )
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={8}>
                                    <Form.Group>
                                        <Form.Label>Penjelasan Singkat Tentang Acara</Form.Label>
                                        <Form.Control as="textarea" name="deskripsi" rows={3} onChange={(e) => setKeterangan(e.target.value)} />
                                    </Form.Group>
                                    {
                                        validation.keterangan && (
                                            <p className="text-danger mt-2" role="alert">
                                                <FontAwesomeIcon icon={faTriangleExclamation} />  {validation.keterangan}
                                            </p>
                                        )
                                    }
                                </Col>
                            </Row>
                        </div>
                    </>
                );

            case 'ruang-coworking':
                return (
                    <>
                        <div className="info-cospace mt-5">
                            <h5 className="title">Informasi Coworking Space</h5>
                            <Row>
                                <Col lg={4}>
                                    <Form.Group>
                                        <Form.Label>Pilih Tanggal</Form.Label>
                                        <Form.Control type="date" name="tanggal" onChange={(e) => setTanggalMulai(e.target.value)} />
                                    </Form.Group>
                                    {
                                        validation.tanggal_1 && (
                                            <p className="text-danger mt-2" role="alert">
                                                <FontAwesomeIcon icon={faTriangleExclamation} />  {validation.tanggal_1}
                                            </p>
                                        )
                                    }
                                </Col>
                                <Col lg={2}>
                                    <Form.Group>
                                        <Form.Label>Waktu Mulai</Form.Label>
                                        <Form.Select aria-label="waktu-mulai" onChange={(e) => setWaktuMulai(e.target.value)} >
                                            <option>--</option>
                                            {times.map((time, index) => (
                                                <option key={index} value={time}>
                                                    {time}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    {
                                        validation.jam_1 && (
                                            <p className="text-danger mt-2" role="alert">
                                                <FontAwesomeIcon icon={faTriangleExclamation} />  {validation.jam_1}
                                            </p>
                                        )
                                    }
                                </Col>
                                <Col lg={2}>
                                    <Form.Group>
                                        <Form.Label>Sampai</Form.Label>
                                        <Form.Select aria-label="sampai" onChange={(e) => setWaktuSelesai(e.target.value)} disabled={!waktuMulai} >
                                            <option>--</option>
                                            {availableEndTimes.map((time, index) => (
                                                <option key={index} value={time}>
                                                    {time}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    {
                                        validation.jam_2 && (
                                            <p className="text-danger mt-2" role="alert">
                                                <FontAwesomeIcon icon={faTriangleExclamation} />  {validation.jam_2}
                                            </p>
                                        )
                                    }
                                </Col>
                            </Row>
                        </div>
                    </>
                );

            default:
                break;

        }
    }

    return (
        <>
            <NavbarComponent isLoggedIn={true} />
            <div id="banner">
                <Container>
                    <Row>
                        <Col lg={8}>
                            <h1>{produk.judul_pendek} <br /> {produk.judul_panjang}</h1>
                        </Col>
                        <Col lg={4}>
                            <p className="banner-teks">{produk.subjudul}</p>
                        </Col>
                    </Row>
                    <Row className="banner-image mt-5">
                        <Col>
                            <img src={produk.foto} alt={produk.judul_pendek} />
                        </Col>
                    </Row>
                </Container>
            </div>

            <div id="fasilitas" className="mt-5">
                <Container>
                    <Row>
                        <Col className="d-lg-flex align-items-center">
                            <h3 className="me-5">Fasilitas</h3>
                            {
                                produk.fasilitas?.map((item, index) => (
                                    <Button key={index} variant="outline-dark me-3">{item.keterangan}</Button>
                                ))
                            }
                        </Col>
                    </Row>
                </Container>
            </div>

            <div id="form-pesan" className="mt-5">
                <Container>
                    <Row>
                        <Col>
                            <h1>Pesan {produk.judul_pendek}</h1>
                            <p>Beritahu kami kebutuhan {produk.judul_pendek} Anda.</p>
                        </Col>
                    </Row>

                    <form onSubmit={handleSubmit}>
                        <div className="info-pemesan">
                            <Row>
                                <Col lg={4}>
                                    <Form.Group>
                                        <Form.Label>Nama Pemesan</Form.Label>
                                        <Form.Control type="text" value={namaPemesan} name="nama-pemesan" placeholder="Masukkan Nama Lengkap" readOnly />
                                    </Form.Group>
                                    {
                                        validation.name && (
                                            <p className="text-danger mt-2" role="alert">
                                                <FontAwesomeIcon icon={faTriangleExclamation} />  {validation.name}
                                            </p>
                                        )
                                    }
                                </Col>
                                <Col lg={4}>
                                    <Form.Group>
                                        <Form.Label>Nomor Telpon</Form.Label>
                                        <Form.Control type="text" value={telepon} name="telpon" placeholder="cth. 08123456789" readOnly />
                                    </Form.Group>
                                    {
                                        validation.phone && (
                                            <p className="text-danger mt-2" role="alert">
                                                <FontAwesomeIcon icon={faTriangleExclamation} />  {validation.phone}
                                            </p>
                                        )
                                    }
                                </Col>
                            </Row>
                        </div>

                        {handleFormProduk()}

                        <div className="info-pembayaran mt-5">
                            <h5 className="title">Informasi Pembayaran</h5>
                            <Row>
                                <Col lg={4}>
                                    <Form.Group>
                                        <Form.Label>Metode Pembayaran</Form.Label>
                                        <Form.Select aria-label="pembayaran" onChange={(e) => setPembayaran(e.target.value)}>
                                            <option>Pilih Metode Bayar</option>
                                            {
                                                bayar.map((item, index) => (
                                                    <option key={index} value={item.id}>{item.nama_pembayaran}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Form.Group>

                                    {
                                        validation.bayar && (
                                            <p className="text-danger mt-2" role="alert">
                                                <FontAwesomeIcon icon={faTriangleExclamation} />  {validation.bayar}
                                            </p>
                                        )
                                    }
                                    {pembayaran ?
                                        (
                                            <>
                                                <img
                                                    src="../src/assets/ic-bca.png"
                                                    alt="Logo Bank"
                                                    className="mb-2 mt-3"
                                                    width={120}
                                                />
                                                <h6>
                                                    Nomor Rekening : <b>123456789</b>
                                                </h6>
                                                <h5>
                                                    <b>a.n Synhub Space</b>
                                                </h5>
                                            </>
                                        ) : (<></>)
                                    }

                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col lg={4}>
                                    <label htmlFor="ringkasan">Ringkasan Pembayaran</label>
                                    <p>Metode bayar yang dipilih: <b>Transfer</b></p>
                                    <p>Total Waktu: <b>Durasi</b> Jam <b>(IDR 10000)</b></p>

                                </Col>
                            </Row>

                        </div>
                        <button className="btn btn-teal w-50 mt-3" type="submit">Reservasi</button>
                    </form>
                </Container>
            </div>

            <KontakComponent />
            <FooterComponent />
        </>
    );
};

export default RoomPage;
