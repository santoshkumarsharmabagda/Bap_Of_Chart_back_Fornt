import React, { useState,useEffect } from 'react';
import  '../NavBar.js/SignUp.css'
import axios from '../../Interceptor';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
function Users() {
  const navigate = useNavigate();
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
  


    const getApiData = async (id) => {
      try {
        console.log(`This is my id ${id}`);
      await axios.get(`/bap/admin/get/user?id=${id}`)
      .then(response =>{
        console.log(response.data.users);
        if (response.data.status == "1") {
          setUsers(response.data.users);
          console.log("done")
        }else{
          console.log("not done")
        }
      })
    } catch (e) {
      console.log(e);
    }
    }

    useEffect(()=>{
      getApiData();
    },[])
    
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const totalPages = Math.ceil(users.length / usersPerPage);
    
  return (
    <>
    <div className='container mt-1 example scrollbar' style={{height:"75vh",overflowY:"auto"}}>
    <table className='table bg-dark' style={{ color: 'white',width:"100%", borderRadius:"10px"}}>
      <thead className='bg-dark' style={{borderRadius:"10px"}}>
        <tr>
          <th style={{color:"white"}} scope='col-2'>#</th>
          <th style={{color:"white"}} scope='col-2'>Email</th>
          <th style={{color:"white"}} scope='col-2'>Action</th>
          <th style={{color:"white"}} scope='col-2'>Chat</th>
        </tr>
      </thead>
      <tbody className='bg-dark' style={{width:"0%",borderRadius:"10px"}}>
        {users?.map((item, index) => {
          return (
            <tr key={index}>
              <th style={{color:"white"}} scope='row'>1</th>
              <td>{item.email}</td>
              {/* <td>{item.number}</td>
              <td>{item.date}</td> */}
              <td>
                {item.action === 1 ? (
                  <button type='button' className='btn-primary' style={{ padding:'5px',height:'30px'}}>
                    Active
                  </button>
                ) : (
                  <button type='button' className='btn-danger' style={{width:"10px !important",padding:'5px',height:'30px'}}>
                    Inactive
                  </button>
                )}
              </td>
              <td>
                <button onClick={()=>navigate(`/Chat/${item.id}`)} type='button' className='btn-primary' style={{ padding:'5px',height:'30px'}} >
                    Chat
                  </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
  <div className="mt-3 d-flex justify-content-center align-items-center">

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

export default Users;
