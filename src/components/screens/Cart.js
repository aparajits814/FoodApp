import React, { useContext, useState } from 'react'
import { CartStateContext, CartDispatchContext } from '../../App'
import Navbar from '../Navbar';
import { Spin, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
function Cart() {
    const [loading,setLoading]=useState(false);
    let data = useContext(CartStateContext);
    let dispatch = useContext(CartDispatchContext);
    let total = 0;
    data.map((d) => {
        return total = total + d.price;
    })
    const onDel = async (index) => {
        await dispatch({ type: "REMOVE", index: index });
    }
    const handleOnSubmit=async()=>{
        setLoading(true);
        let authtoken=localStorage.getItem('AuthToken');
        const response=await fetch("http://localhost:5000/api/foodOrder",{
            method:'POST',
            headers:{
                'Content-type':'application/json',
                'authtoken':authtoken
            },
            body:JSON.stringify(data)
        })
        const r=await response.json();
        if(r.msg==="Order Placed!"){
            message.success(r.msg);
            await dispatch({type:"DROP"});
        }
        setLoading(false);
    }
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (
        <div>
            <Navbar></Navbar>
            {loading && <Spin indicator={antIcon}></Spin>}
            <div className="table-responsive">

                <table className="table table-bordered table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">size</th>
                            <th scope="col">Amount(in Rs)</th>
                            <th scope="col">...</th>
                        </tr>
                    </thead>
                    <tbody>

                        {data.map((d, index) => {
                            return (
                                <tr key={index+1}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{d.name}</td>
                                    <td>{d.qty}</td>
                                    <td>{d.size}</td>
                                    <td>{d.price}</td>
                                    <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill Deleteicon" viewBox="0 0 16 16" onClick={() => { onDel(index) }}>
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                    </svg></td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
                {
                    data.length === 0 ?
                        <div className="container_cart">
                            <h2>Cart Empty!</h2>
                        </div>
                        :
                        <div className="container">
                            <h2>Your Total Bill is: Rs.{total}</h2>
                            <button className="btn btn-danger" onClick={handleOnSubmit}>Place Order</button>
                        </div>
                }

            </div>
        </div>
    )
}

export default Cart
