import logo from "../../assets/logo.png"

import { Container, Row, Col, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

import Api from "../../api";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import toast from "react-hot-toast";

const RegisterPage = () => {
    // inisialisasi state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [validation, setValidation] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validasi
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("password", password);
        formData.append("password_confirmation", confirmPassword);

        // console.log(name, email, phone, password, confirmPassword);

        await Api.post('/customer/register', formData)
            .then((res) => {
                // console.log(res.data);
                toast.success(res.data, {
                    duration: 3000,
                    position: 'top-center',
                    style: {
                        width: '30rem',
                    }
                });

                navigate("/login");
            })
            .catch((err) => {
                // console.log(err.response.data);
                setValidation(err.response.data);
            })
    }

    return (
        <>
            <div id="register">
                <Container className="d-flex justify-content-center">
                    <Row>
                        <Col>
                            <div className="wrapper">
                                <div className="top text-center">
                                    <img src={logo} alt="" className="mt-5 mb-5" />
                                    <h1>Daftar Akun</h1>
                                    <p>Buat akun untuk eksplorasi ruangan.</p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <Form.Label>Nama Lengkap</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nama-lengkap"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Masukkan Nama Lengkap"
                                    />
                                    {
                                        validation.name && (
                                            <p className="text-danger mt-2" role="alert">
                                                <FontAwesomeIcon icon={faTriangleExclamation} />  {validation.name}
                                            </p>
                                        )
                                    }


                                    <Form.Label>Nomor Telepon</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="telepon"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Masukkan Email"
                                    />
                                    {
                                        validation.phone && (
                                            <p className="text-danger mt-2" role="alert">
                                                <FontAwesomeIcon icon={faTriangleExclamation} />  {validation.phone}
                                            </p>
                                        )
                                    }

                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Masukkan Email"
                                    />
                                    {
                                        validation.email && (
                                            <p className="text-danger mt-2" role="alert">
                                                <FontAwesomeIcon icon={faTriangleExclamation} />  {validation.email}
                                            </p>
                                        )
                                    }

                                    <Form.Label>Buat Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Masukkan Password"
                                    />
                                    {
                                        validation.password && (
                                            <p className="text-danger mt-2" role="alert">
                                                <FontAwesomeIcon icon={faTriangleExclamation} />  {validation.password}
                                            </p>
                                        )
                                    }

                                    <Form.Label>Konfirmasi Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Konfirmasi Password"
                                    />
                                    {
                                        validation.password && (
                                            <p className="text-danger mt-2" role="alert">
                                                <FontAwesomeIcon icon={faTriangleExclamation} />  {validation.password}
                                            </p>
                                        )
                                    }

                                    <button className="btn btn-teal w-100 mt-5" type="submit">Buat Akun</button>
                                </form>

                                <p className="mt-5 text-center">Sudah punya akun? <Link to="/login">Masuk</Link></p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default RegisterPage