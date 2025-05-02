import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import { toast } from 'react-toastify'

const NoteForm = ({ onAddNote, getNote }) => {
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  
  const validation = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required")
  })
  
  const formik = useFormik({
    initialValues: {
      title: '',
      content: ''
    },
    validationSchema: validation,
    onSubmit: async (values, { resetForm }) => {
      setSuccessMsg('')
      setErrorMsg('')
      
      try {
        await onAddNote(values)
        setSuccessMsg('Note added successfully')
        toast.success('Note added successfully')
        resetForm()
        getNote()
      } catch (error) {
        const errorMessage = error.response?.data?.msg || 'Failed to add note'
        setErrorMsg(errorMessage)
        toast.error(errorMessage)
      }
    }
  })
  
  const { handleSubmit, handleChange, handleBlur, values, touched, errors, isSubmitting } = formik
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add a New Note</h2>
      
      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative mb-4">
          {successMsg}
        </div>
      )}
      
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4">
          {errorMsg}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`input ${touched.title && errors.title ? 'border-red-500' : ''}`}
            placeholder="Enter note title"
          />
          {touched.title && errors.title && (
            <p className="error-message">{errors.title}</p>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows="4"
            value={values.content}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`input resize-none ${touched.content && errors.content ? 'border-red-500' : ''}`}
            placeholder="Enter note content"
          ></textarea>
          {touched.content && errors.content && (
            <p className="error-message">{errors.content}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full"
        >
          {isSubmitting ? 'Adding Note...' : 'Add Note'}
        </button>
      </form>
    </div>
  )
}

export default NoteForm