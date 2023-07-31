import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Array from './Data';
import { FiXCircle } from 'react-icons/fi';
import { BsFlag } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    handleFilter('Draft');
  }, []);

  const handleFilter = (status) => {
    if (status === 'completed') {
      setDatas(Array.filter((data) => data.status === status));
    } else {
      setDatas(Array.filter((data) => data.status !== 'completed'));
    }
  };
useEffect(()=>{
   window.localStorage.clear();
},[])

  return (
    <div>
      <div className='header'>
        <h1 className='bar'>|</h1>
        <h2 className='dash'>DASHBOARD</h2>
        <Link to='/rqt'>
          <button className='btn1'>Create</button>
        </Link>
      </div>
      <div className='box'>
        <div className='tablebtn'>
          <button onClick={() => handleFilter('Draft')} className='btn2'>
            <FiXCircle /> Inprogress
          </button>
          <button onClick={() => handleFilter('completed')} className='btn3'>
            <BsFlag /> Completed
          </button>
          <hr />
        </div>

        <div className='searchbar'>
          <label htmlFor=''>Search:</label>
          <input type='text' />
        </div>
        <div className='table'>
          <table border={1}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Requested On</th>
                <th>Customer Name</th>
                <th>Branch Code</th>
                <th>Branch Name</th>
                <th>Customer Account Number</th>
                <th>Compensation</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.requestedon}</td>
                  <td>{data.customername}</td>
                  <td>{data.branchcode}</td>
                  <td>{data.branchname}</td>
                  <td>{data.customeraccountnumber}</td>
                  <td>{data.compensation}</td>
                  <td>{data.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
