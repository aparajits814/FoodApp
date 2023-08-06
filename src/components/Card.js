import React, { useContext, useEffect, useRef, useState } from 'react'
import { CartDispatchContext } from '../App';
import { message } from 'antd';
function Card(prop) {
    const priceRef = useRef();
    let tempdata = Object.keys(prop.data.options[0]);
    let options = prop.data.options[0];
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(tempdata[0]);
    const dispatch = useContext(CartDispatchContext);
    const onChangeQty = (e) => {
        setQty(e.target.value);
    }
    const onChangeSize = (e) => {
        setSize(e.target.val);
    }

    let price = qty * parseInt(options[size]);
    const HandleOnClick = async () => {
        message.success("Added to Cart!");
        await dispatch({ type: "ADD", id: prop.data._id, name: prop.data.name, price: price, qty: qty, size: size });
    }
    const msgDisp=()=>{
        message.warning("Login To Order Food");
    }
    useEffect(() => {
        setSize(priceRef.current.value);

    }, [size]);
    return (
        <div>
            <div className="card" style={{ "width": "300px", "height": "300px" }}>
                <img src={prop.data.img} className="card-img-top" alt="..." style={{ height: "120px" }} />
                <div className="card-body">
                    <h5 className="card-title">{prop.data.name}</h5>

                    <div className="container w-100">
                        <select className="m-2 h-100" value={qty} onChange={onChangeQty}>
                            {
                                Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })
                            }
                        </select>
                        <select className='m-2 h-100' ref={priceRef} value={size} onChange={onChangeSize}>
                            {Object.keys(prop.data.options[0]).map((data) => {
                                return (
                                    <option key={data} value={data} >{data}</option>
                                )
                            })}
                        </select>
                    </div>
                    <p className="card-text">Final Price:{price}</p>
                    {localStorage.getItem('AuthToken') ?
                        <button className="btn btn-danger" onClick={HandleOnClick}>Add to Cart</button>
                        :
                        <button className='btn btn-danger' onClick={msgDisp}>Login To Order</button>
                    }


                </div>
            </div>
        </div>
    )
}

export default Card
