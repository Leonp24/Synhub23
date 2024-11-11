import { Link } from "react-router-dom"
import { Button, Table } from "react-bootstrap"
import DefaultLayout from "../../../components/Dashboard/DefaultLayout";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Api from "../../../api";
import PaginationComponent from "../../../components/Dashboard/PaginationComponent";

const BankPage = () => {
    const [bayar, setBayar] = useState([]);
    const [perPage, setPerPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [total, setTotal] = useState(0);

    const token = Cookies.get('token');

    const getDataBayar = async (pageNumber) => {

        const page = pageNumber ? pageNumber : currentPage;

        await Api.get(`/dashboard/bayar?page=${page}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setBayar(res.data.data);
                setCurrentPage(res.data.current_page);
                setPerPage(res.data.per_page);
                setTotal(res.data.total);
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    const handleDelete = async (id) => {
        await Api.delete(`/dashboard/bayar/${id}`, {
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
    }, []);

    return (
        <DefaultLayout>
            <div className="d-flex justify-content-between align-item-center mb-4">
                <h3>Pembayaran</h3>
                <Link to="/admin/bank/new" className="btn btn-teal">Tambah</Link>
            </div>
            <div className="bg-white p-3 border rounded">
                <Table bordered>
                    <thead className="table-light border">
                        <tr>
                            <th>No</th>
                            <th>Logo</th>
                            <th>Nama Pembayaran</th>
                            <th>No. Rekening</th>
                            <th>Pemilik Rekening</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bayar.map((item, index) => (
                                <tr key={index}>
                                    <td>{++index + (perPage * (currentPage - 1))}</td>
                                    <td><img src={item.logo} width={200} alt={item.nama_pembayaran} /></td>
                                    <td>{item.nama_pembayaran}</td>
                                    <td>{item.nomor_rekening}</td>
                                    <td>{item.nama_orang}</td>
                                    <td>
                                        <Link to={`/admin/bank/${item.id}`} className="btn btn-info btn-sm text-white mb-1 me-2">Edit</Link>
                                        <Button onClick={() => handleDelete(item.id)} className="btn-warning btn-sm text-white mb-1">Delete</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <PaginationComponent
                    currentPage={currentPage}
                    perPage={perPage}
                    total={total}
                    onChange={(pageNumber) => getDataBayar(pageNumber)}
                    position="end"
                />
            </div>
        </DefaultLayout>
    )
}

export default BankPage;