import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { validator } from '../../utils/validator'
import '../../scss/components/_forms.scss'
import TextField from '../common/form/TextField'
import CheckBoxField from '../common/form/CheckBoxField'

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
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
        message: 'Password must be at least 8 characters',
        value: 8,
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
        <h1 className='forms__title'>Sign in</h1>
        <form onSubmit={handleSubmit} className='forms__form'>
          <TextField
            label='Email'
            name='email'
            value={data.email}
            onChange={handleChange}
            error={errors.email}
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
            value={data.stayOn}
            onChange={handleChange}
            name='stayOn'
          >
            Stay logged in
          </CheckBoxField>
          <button
            className={'forms__item-btn' + (isValid ? ' active' : '')}
            type='submit'
            disabled={!isValid}
          >
            sign in
          </button>
        </form>
        <p className='forms__text-help'>
          Don't have an account?
          <Link to='/logout' role='button'>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginForm
