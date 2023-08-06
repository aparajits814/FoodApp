import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
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
    console.log(hist);
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
                hist.map((d,index) => {
                    return (
                        <div key={uuidv4()}>
                            <h4 key={uuidv4()}>{d.date.slice(0, 10)}</h4>
                            <hr key={uuidv4()} />
                            <table key={uuidv4()} className="table table-bordered table-dark">
                                <thead key={uuidv4()}>
                                    <tr key={uuidv4()}>
                                        <th scope="col">Sr.No</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Size</th>
                                    </tr>
                                </thead>
                                <tbody key={uuidv4()}>
                                    {d.data.map((x, i) => {
                                        return (
                                            <tr key={uuidv4()}>
                                                <th  scope="row">{i+1}</th>
                                                <td>{x.name}</td>
                                                <td> {x.price} </td>
                                                <td>{x.qty}</td>
                                                <td>{x.size} </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <hr key={uuidv4()} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default History
