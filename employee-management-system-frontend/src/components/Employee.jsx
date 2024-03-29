import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const Employee = () => {

  const [firstName,setFirstName]=useState('');
  const [lastName,setLastName]=useState('');
  const [email,setEmail]=useState('');

  const [errors,setErrors]=useState({
    'firstName':'',
    'lastName':'',
    'email':''
  });

  const navigator=useNavigate();

  const {id}=useParams();

  useEffect(()=>{

    if(id)
    {
        getEmployee(id).then(response=>{
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmail(response.data.email);
        }).catch(error=> console.log(error))
    }

  },[]);

  function saveOrUpdateEmployee(event)
  {
    event.preventDefault();
    if(validationForm())
    {
        const employee={firstName,lastName,email};
        console.log(employee);

        if(id)
        {
            updateEmployee(id,employee)
            .then(response => {
                console.log(response.data);
                navigator('/employees');
            })
            .catch(error=> console.log(error))
        }
        else{
        createEmployee(employee)
        .then(response => {
            console.log(response.data);
            navigator('/employees');
        })
       }
    }
  }

  function validationForm()
  {
    let valid=true;

    const errorsCopy={...errors};

    if(firstName.trim())
    {
        errorsCopy.firstName='';
    }
    else
    {
        errorsCopy.firstName='First Name is required';
        valid=false;
    }

    if(lastName.trim())
    {
        errorsCopy.lastName='';
    }
    else
    {
        errorsCopy.lastName='Last Name is required';
        valid=false;
    }

    if(email.trim())
    {
        errorsCopy.email='';
    }
    else
    {
        errorsCopy.email='Email is required';
        valid=false;
    }
    setErrors(errorsCopy);

    return valid;
  }

  function pageTitle()
  {
    if(id)
    {
        return <h2 className='text-center'>Update Employee</h2>
    }
    else
    {
        return <h2 className='text-center'>Add Employee</h2>
    }
  }

  return (
    <div className='container'>
        <br /><br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label htmlFor='firstName' className='form-label'>First Name: </label>
                            <input type="text" name="firstName" id="firstName"  
                            value={firstName} placeholder='Enter Employee First Name' 
                            className={`form-control ${errors.firstName ? 'is-invalid':''}`} 
                            onChange={event => setFirstName(event.target.value)}/>
                            {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label htmlFor='lastName' className='form-label'>Last Name: </label>
                            <input type="text" name="lastName" id="lastName"  
                            value={lastName} placeholder='Enter Employee Last Name' 
                            className={`form-control ${errors.lastName ? 'is-invalid':''}`} 
                            onChange={event => setLastName(event.target.value)}/>
                            {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label htmlFor='email' className='form-label'>Email: </label>
                            <input type="text" name="email" id="email"  
                            value={email} placeholder='Enter Employee Email' 
                            className={`form-control ${errors.email? 'is-invalid':''}`} 
                            onChange={event => setEmail(event.target.value)}/>
                            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div>
                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Employee