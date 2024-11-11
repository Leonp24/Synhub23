import { Link } from "react-router-dom"
import { Button, Table } from "react-bootstrap"
import DefaultLayout from "../../../components/Dashboard/DefaultLayout";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Api from "../../../api";
import PaginationComponent from "../../../components/Dashboard/PaginationComponent";


const BannerPage = () => {
    const [banner, setBanner] = useState([]);
    const [perPage, setPerPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [total, setTotal] = useState(0);

    const token = Cookies.get('token');

    const getDataBanner = async (pageNumber) => {

        const page = pageNumber ? pageNumber : currentPage;

        await Api.get(`/dashboard/banner?page=${page}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setBanner(res.data.data);
                setCurrentPage(res.data.current_page);
                setPerPage(res.data.per_page);
                setTotal(res.data.total);
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    useEffect(() => {
        getDataBanner();
    }, []);

    return (
        <DefaultLayout>
            <div className="d-flex justify-content-between align-item-center mb-4">
                <h3>BannerPage</h3>
                <Link to="/admin/banner/new" className="btn btn-teal">Tambah</Link>
            </div>
            <div className="bg-white p-3 border rounded">
                <Table bordered>
                    <thead className="table-light border">
                        <tr>
                            <th>No</th>
                            <th>Image</th>
                            <th>Judul</th>
                            <th>Posisi</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            banner.map((item, index) => (
                                <tr key={index}>
                                    <td>{++index + (perPage * (currentPage - 1))}</td>
                                    <td><img src={item.foto} width={200} alt={item.nama_pembayaran} /></td>
                                    <td>{item.judul}</td>
                                    <td>{item.posisi}</td>
                                    <td>
                                        <Link to="/admin/banner/:id" className="btn btn-info btn-sm text-white mb-1 me-2">Edit</Link>
                                        <Button className="btn-warning btn-sm text-white mb-1">Delete</Button>
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
                    onChange={(pageNumber) => getDataBanner(pageNumber)}
                    position="end"
                />
            </div>
        </DefaultLayout>
    )
}

export default BannerPage;