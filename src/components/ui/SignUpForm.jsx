import { useState, useEffect } from 'react'
import CheckBoxField from '../common/form/CheckBoxField'
import { Link } from 'react-router-dom'
import { validator } from '../../utils/validator'
import TextField from '../common/form/TextField'

const SignUp = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
    licence: false,
  })
  const [errors, setErrors] = useState({})

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }

  const validatorConfig = {
    email: {
      isRequired: { message: 'Email is required' },
      isEmail: {
        message: 'Email entered incorrectly',
      },
    },
    password: {
      isRequired: { message: 'Password is required' },
      isCapitalSymbol: {
        message: 'Password must contain at least one capital letter',
      },
      isContainDigit: {
        message: 'Password must contain at least one number',
      },
      min: {
        message: 'Password must be at least 8 characters long',
        value: 8,
      },
    },
    name: {
      isRequired: { message: 'Name is required' },
    },
    licence: {
      isRequired: {
        message: 'You cannot register without confirming the license agreement',
      },
    },
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  useEffect(() => {
    validate()
  }, [data])

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log(data)
  }

  return (
    <div className='forms'>
      <div className='forms__wrapper'>
        <h1 className='forms__title'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='forms__form'>
          <TextField
            label='Email'
            name='email'
            value={data.email}
            onChange={handleChange}
            error={errors.email}
          />
          <TextField
            label='Name'
            name='name'
            value={data.name}
            onChange={handleChange}
            error={errors.name}
          />
          <TextField
            label='Password'
            type='password'
            name='password'
            value={data.password}
            onChange={handleChange}
            error={errors.password}
          />
          <CheckBoxField
            value={data.licence}
            onChange={handleChange}
            name='licence'
            error={errors.licence}
          >
            I accept the terms
            <a
              style={{
                cursor: 'pointer',
                textDecoration: 'underline',
                marginLeft: '5px',
              }}
            >
              user agreement
            </a>
          </CheckBoxField>
          <button
            className={'forms__item-btn' + (isValid ? ' active' : '')}
            type='submit'
            disabled={!isValid}
          >
            Submit
          </button>
        </form>
        <p className='forms__text-help'>
          Do you already have an account?
          <Link to='/login' role='button'>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp
