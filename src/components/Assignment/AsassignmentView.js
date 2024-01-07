import React, { useEffect, useState } from 'react'
import PDFViewer from 'pdf-viewer-reactjs'
import axios from '../../Interceptor'

function AssignmentView() {
    const [data, setdata] = useState([])

    const getAssignment = async () => {
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
    }, [])

    return (
        <div>
            {data?.map((assignment) => {
                return (
                    <div key={assignment.id}>
                        <h2>{assignment.assignment_name}</h2>
                        <PDFViewer
                            document={{
                                url: assignment.assignment_file, // PDF file URL
                            }}
                            width="800px"
                            height="500px"
                        />
                    </div>
                );
            })}
        </div>
    )
}

export default AssignmentView
