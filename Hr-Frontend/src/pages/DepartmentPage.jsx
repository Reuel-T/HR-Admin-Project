import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import apiClient from '../api/http';

function DepartmentPage() {

  //get id from route
  const { id } = useParams();

  /* const departmentQuery = useQuery({
    queryKey: ['get-department', id],
    queryFn: getDepartmentEmployees
  }) */

  async function getDepartmentEmployees() {
    return await apiClient.get('');
  }

  return (
    <div>Department { id }</div>
  )
}

export default DepartmentPage