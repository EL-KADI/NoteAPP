import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerUser } from '../utils/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { FiUser, FiMail, FiLock, FiPhone, FiCalendar, FiEye, FiEyeOff } from 'react-icons/fi'

const Register = () => {
  const navigate = useNavigate()
  const { setIsLoading } = useAuth()
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  const validation = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be less than 20 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    age: Yup.number()
      .min(18, "Age must be at least 18 years old")
      .max(99, "Age must be less than 99 years old")
      .required("Age is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Phone number is not valid")
      .required("Phone is required"),
  })
  
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      age: '',
      phone: ''
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      setSuccessMsg('')
      setErrorMsg('')
      setIsLoading(true)
      
      try {
        const data = await registerUser(values)
        setIsLoading(false)
        
        if (data?.msg === 'done') {
          setSuccessMsg('Account created successfully')
          toast.success('Registration successful! Please log in.')
          setTimeout(() => {
            navigate('/login')
          }, 1500)
        }
      } catch (err) {
        setIsLoading(false)
        const errorMessage = err.response?.data?.msg || 'Registration failed. Please try again.'
        setErrorMsg(errorMessage)
        toast.error(errorMessage)
      }
    }
  })
  
  const { handleSubmit, handleChange, handleBlur, values, touched, errors, isSubmitting } = formik
  
  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-md animate-fade-in">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              sign in to your account
            </Link>
          </p>
        </div>
        
        {successMsg && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
            {successMsg}
          </div>
        )}
        
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
            {errorMsg}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <FiUser />
                </span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`input pl-10 ${
                    touched.name && errors.name ? 'border-red-500' : ''
                  }`}
                  placeholder="Full name"
                />
              </div>
              {touched.name && errors.name && (
                <p className="error-message">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <FiMail />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`input pl-10 ${
                    touched.email && errors.email ? 'border-red-500' : ''
                  }`}
                  placeholder="Email address"
                />
              </div>
              {touched.email && errors.email && (
                <p className="error-message">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <FiLock />
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`input pl-10 ${
                    touched.password && errors.password ? 'border-red-500' : ''
                  }`}
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FiCalendar />
                  </span>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    value={values.age}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input pl-10 ${
                      touched.age && errors.age ? 'border-red-500' : ''
                    }`}
                    placeholder="Age"
                  />
                </div>
                {touched.age && errors.age && (
                  <p className="error-message">{errors.age}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FiPhone />
                  </span>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input pl-10 ${
                      touched.phone && errors.phone ? 'border-red-500' : ''
                    }`}
                    placeholder="Phone number"
                  />
                </div>
                {touched.phone && errors.phone && (
                  <p className="error-message">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full flex justify-center items-center"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
            ) : (
              'Create account'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register