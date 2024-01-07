import React, { useEffect, useState } from 'react'
import Pagination from 'react-bootstrap/Pagination';
import {AiFillEye} from 'react-icons/ai'
import { NavLink } from 'react-router-dom';
import axios from '../../Interceptor';

function Transactions() {
  const [data, setdata] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust the number of items per page

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);


const getData = async()=>{
  try{

    await axios.get("/bap/admin/transaction/get/all")
    .then((response)=>{
        setdata(response.data);
    })
  }catch(e){
    console.log(e)
  }
}

useEffect(() => {
 getData()
},[])


  return (
    <>

    <div className='container mt-1 example' style={{height:"75vh",overflowY:"scroll"}}>
    <table className='table bg-dark' style={{ color: 'white',width:"100%", borderRadius:"10px"}}>
      <thead className='bg-dark' style={{borderRadius:"10px"}}>
        <tr>
          <th style={{color:"white"}} scope='col'>#</th>
          <th style={{color:"white"}} scope='col'>email</th>
          <th style={{color:"white"}} scope='col'>Txn. Id</th>
          <th style={{color:"white"}} scope='col'>Date</th>
          <th style={{color:"white"}} scope='col'>Status</th>
          {/* <th style={{color:"white"}} scope='col'>View</th> */}

        </tr>
      </thead>
      <tbody className='bg-dark' style={{width:"100%",borderRadius:"10px"}}>
        {currentItems.map((item, index) => {
          return (
            <tr key={item.id}>
              <th scope='row' style={{color:"white"}} >{item.id}</th>
              <td>{item.email}</td>
              <td>{item.txnref}</td>
              <td>{item.created_at}</td>
              <td>
                {item.status === 'Success' ? (
                  <p type='button' className='btn btn-success w-100'>
                    Success
                  </p>
                ) : (
                  <p type='button' className='btn btn-danger w-100'>
                    Failed
                  </p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
  <div className="d-flex justify-content-center mt-3">
  <Pagination>
    <Pagination.First onClick={() => paginate(1)} />
    <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
    {Array.from({ length: totalPages }).map((_, index) => (
      <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
        {index + 1}
      </Pagination.Item>
    ))}
    <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
    <Pagination.Last onClick={() => paginate(totalPages)} />
  </Pagination>
</div>
    </>

  
  )
}

export default Transactions
