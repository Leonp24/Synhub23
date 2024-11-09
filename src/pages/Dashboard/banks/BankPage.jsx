import { Link } from "react-router-dom"
import { Button, Table } from "react-bootstrap"
import DefaultLayout from "../../../components/Dashboard/DefaultLayout";
import { useEffect, useState } from "react";
import Api from "../../../api";
import Cookies from "js-cookie";

const BankPage = () => {

    const [bayar, setBayar] = useState([])
    const token = Cookies.get('token');

    const getDataBayar =  async () => {
        await Api.get('/dashboard/bayar', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getDataBayar();
    }, [])

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
                            <th>No Rekening</th>
                            <th>Pemilik Rekening</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>loading...</td>
                            <td>loading...</td>
                            <td>loading...</td>
                            <td>loading...</td>
                            <td>loading...</td>
                            <td><Link to="/admin/bank/:id" className="btn btn-info btn-sm text-white mb-1 me-2">Edit</Link>
                                <Button className="btn-warning btn-sm text-white mb-1">Delete</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </DefaultLayout>
    )
}

export default BankPage;