import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Card, ButtonGroup, ToggleButton } from "react-bootstrap";
import DefaultLayout from '../../../components/Dashboard/DefaultLayout';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import Api from '../../../api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"

const EditBankPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const token = Cookies.get('token');

    const [status, setStatus] = useState('');
    const [namaPembayaran, setNamaPembayaran] = useState('');
    const [nomorRekening, setNomorRekening] = useState('');
    const [namaPemilik, setNamaPemilik] = useState('');
    const [validation, setValidation] = useState([]);

    const [logo, setLogo] = useState('');
    const [sourceLogo, setSourceLogo] = useState('')

    const getDataBayar = async () => {
        await Api.get(`/dashboard/bayar/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setLogo(res.data.logo)
                setNamaPembayaran(res.data.nama_pembayaran)
                setNamaPemilik(res.data.nama_orang)
                setNomorRekening(res.data.nomor_rekening)
                setStatus(res.data.status)
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    const handleFileImage = (e) => {
        const imageData = e.target.files[0];

        if (!imageData.type.match('image.*')) {
            setLogo('');
            toast.error("Maaf, Format Belum Sesuai. Hanya mendukung file image !", {
                duration: 3000,
                position: "top-center"
            });

            return;
        }

        setLogo(e.target.files[0]);
        setSourceLogo(URL.createObjectURL(e.target.files[0]));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("ditekan")
        const formData = new FormData();
        formData.append('nama_pembayaran', namaPembayaran);
        formData.append('nomor_rekening', nomorRekening);
        formData.append('nama_orang', namaPemilik);
        formData.append('status', status);
        // formData.append('logo', logo);
        formData.append('_method', 'PATCH');

        await Api.post(`/dashboard/bayar/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data)
                if (res.status == 202) {
                    toast.success(res.data.message, {
                        duration: 3000,
                        position: "top-center"
                    })
                    navigate('/admin/bank');
                }
            })
            .catch((err) => {
                console.log(err);
                if (err.status == 400) {
                    toast.error(err.response.message, {
                        duration: 3000,
                        position: "top-center"
                    })
                }
                if (err.status == 422) {
                    setValidation(err.response.data)
                }
            })
    }

    useEffect(() => {
        getDataBayar();
    }, [])

    return (
        <DefaultLayout>
            <h3>Edit Pembayaran</h3>
            <Card className="p-3 border">
                <Form onSubmit={handleSubmit}>
                    {
                        sourceLogo ? (<img src={sourceLogo} width={200} />) : (<img src={logo} width={200} />)
                    }
                    <Form.Group className='mt-2'>
                        <Form.Label>Logo</Form.Label>
                        <Form.Control type="file" onChange={handleFileImage} />
                        {
                            validation.logo && (
                                <p className="text-danger" role="alert">
                                    <FontAwesomeIcon icon={faTriangleExclamation} /> {validation.logo}
                                </p>
                            )
                        }
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Form.Label>Nama Pembayaran</Form.Label>
                        <Form.Control type="text" value={namaPembayaran} onChange={(e) => setNamaPembayaran(e.target.value)} placeholder="Masukkan Nama Pembayaran" />
                        {
                            validation.nama_pembayaran && (
                                <p className="text-danger" role="alert">
                                    <FontAwesomeIcon icon={faTriangleExclamation} /> {validation.nama_pembayaran}
                                </p>
                            )
                        }
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Form.Label>No. Rekening</Form.Label>
                        <Form.Control type="number" value={nomorRekening} onChange={(e) => setNomorRekening(e.target.value)} placeholder="Masukkan No. Rekening" />
                        {
                            validation.nomor_rekening && (
                                <p className="text-danger" role="alert">
                                    <FontAwesomeIcon icon={faTriangleExclamation} /> {validation.nomor_rekening}
                                </p>
                            )
                        }
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Form.Label>Pemilik Rekening</Form.Label>
                        <Form.Control type="text" value={namaPemilik} onChange={(e) => setNamaPemilik(e.target.value)} placeholder="Masukkan Pemilik" />
                        {
                            validation.nama_orang && (
                                <p className="text-danger" role="alert">
                                    <FontAwesomeIcon icon={faTriangleExclamation} /> {validation.nama_orang}
                                </p>
                            )
                        }
                    </Form.Group>

                    <Form.Group className='mt-3'>
                        <ButtonGroup>
                            <ToggleButton type='radio' variant='outline-success' value='y' checked={status === 'y'} onClick={(e) => setStatus('y')}>
                                Show
                            </ToggleButton>
                            <ToggleButton type='radio' variant='outline-danger' value='n' checked={status === 'n'} onClick={(e) => setStatus('n')}>
                                Hide
                            </ToggleButton>
                        </ButtonGroup>
                    </Form.Group>

                    <Button className='btn-info text-white btn-sm mt-3 me-2' type="submit">
                        Save
                    </Button>
                    <Button className="btn-warning text-white btn-sm mt-3" onClick={() => navigate("/admin/bank")} >
                        Close
                    </Button>
                </Form>
            </Card>
        </DefaultLayout>
    )
}

export default EditBankPage