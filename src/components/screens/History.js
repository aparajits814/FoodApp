import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'

function History() {
    const [hist, setHist] = useState([]);
    const fetchData = async () => {
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
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div>
            <Navbar></Navbar>
            {hist.length === 0 ?
                <div className>
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
                            <table class="table table-bordered table-dark">
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
