import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
function History() {
    
    const [hist, setHist] = useState([]);
    const [loading,setLoading]=useState(false);
    const fetchData = async () => {
        setLoading(true);
        let authtoken = localStorage.getItem('AuthToken');
        const response = await fetch('http://localhost:5000/api/foodfetch', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authtoken': authtoken
            },
        })
        const r = await response.json();
        setHist(r.reverse());
        setLoading(false);
    }
    useEffect(() => {
        fetchData();
    }, [])
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (
        <div>
            <Navbar></Navbar>
            {loading && <Spin indicator={antIcon}></Spin>}
            {hist.length === 0 && !loading ?
                <div className="container">
                    No Orders placed
                </div>
                :
                ""
            }
            {
                hist.map((d) => {
                    return (
                        <>
                            <h4>{d.date.slice(0, 10)}</h4>
                            <hr />
                            <table className="table table-bordered table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col">Sr.No</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Size</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {d.data.map((x, i) => {
                                        return (
                                            <tr>
                                                <th scope="row">{i + 1}</th>
                                                <td>{x.name}</td>
                                                <td> {x.price} </td>
                                                <td>{x.qty}</td>
                                                <td>{x.size} </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <hr />
                        </>
                    )
                })
            }
        </div>
    )
}

export default History
