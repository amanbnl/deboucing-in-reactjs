import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react'

type Employee = {
  id: string;
  name: string;
}
const ListWrapper: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [searchParam, setSearchParam] = useState('')

  useEffect(() => {
    let debounceTimeout: NodeJS.Timeout = null;
    
    clearTimeout(debounceTimeout)
    
    debounceTimeout = setTimeout(() => {
      getUsersList()
    }, 1500)

    return () => {
      clearTimeout(debounceTimeout)
    }
  }, [searchParam])



  useEffect(() => {
    getUsersList()
  }, [])

  const getUsersList = () => {
    let apiURL = `https://jsonplaceholder.typicode.com/users?_limit=5`
    if(searchParam.length) {
      apiURL = apiURL + `&name=${searchParam}`
    }
    axios.get(apiURL).then((response: AxiosResponse) => {
      const employeeList = response.data
      setEmployees(employeeList)
    }).catch((error: AxiosError) => {
      //handle error accordingly
    })
  }

  const handleSearch = (event) => {
    setSearchParam(event.target.value)
  }

  return (
    <div className="employee-wrapper">
      <h1>Search Employee</h1>
      <div className='search-box'>
        <input type="text" onChange={(e) => handleSearch(e)} className="search-text" placeholder='Search By Name' />
        <button type="button" className='search-btn'> Search </button>
      </div>
      {employees.map((employee, index) =>
      (
        <div className="employee-details" key={index}>
          <p>{employee.name}</p>
        </div>
      )
      )}
      {
        !employees.length && <div className="employee-details">
        <p>No Record Found</p>
      </div>
      }
    </div>
  );
}

export default ListWrapper