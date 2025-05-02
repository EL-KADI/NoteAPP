import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useRef } from 'react'
import { FiX } from 'react-icons/fi'
import { updateNote } from '../../utils/api.js'
import { toast } from 'react-toastify'

const NoteModal = ({ note, isOpen, onClose, getNote }) => {
  const modalRef = useRef(null)
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])
  
  const validation = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required")
  })
  
  const formik = useFormik({
    initialValues: {
      title: note.title || '',
      content: note.content || ''
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      try {
        await updateNote(note._id, values)
        toast.success('Note updated successfully')
        getNote()
        onClose()
      } catch (error) {
        toast.error('Failed to update note')
        console.log(error)
      }
    }
  })
  
  const { handleSubmit, handleChange, handleBlur, values, touched, errors, isSubmitting } = formik
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
      <div 
        ref={modalRef}
        className="relative bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4 animate-fade-in"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FiX size={24} />
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Note</h2>
        
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
              rows="6"
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
          
          <div className="flex space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary flex-1"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NoteModal