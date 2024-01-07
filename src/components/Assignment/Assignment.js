import React from 'react'
import axios from '../../Interceptor';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Assignment() {
    const Navigate = useNavigate();
    const [data, setdata] = useState([])
    const getAssignment = async() => {
        try {
            await axios.get("/bap/admin/get/assignment")
            .then((response) => {
                setdata(response.data.data)
                console.log(response.data.data);
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAssignment();
    },[])
  return (
    <div className='container mt-1'>
    <table className='table table-striped table bg-dark'  style={{borderRadius:"10px"}}  >
    <tbody>
     {
        data?.map((data) => {
            return(
                <tr className="" key={data.id} >
                <td style={{color:"white", fontSize:"2rem"}} >{data.assignment_name}</td>
                <td>
                <button onClick={()=> {Navigate("/asassignmentView")}} >View Assignment</button>
                </td>
                </tr>
            )
        })
     }
     </tbody>
     </table>
    </div>
  )
}

export default Assignment
