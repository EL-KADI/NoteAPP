import { useState } from 'react'
import { FiEdit2, FiTrash2, FiMoreVertical } from 'react-icons/fi'
import NoteModal from './NoteModal.jsx'

const NoteCard = ({ note, onDelete, onUpdate, getNote }) => {
  const [showOptions, setShowOptions] = useState(false)
  const [showModal, setShowModal] = useState(false)
  
  const toggleOptions = () => {
    setShowOptions(!showOptions)
  }
  
  const toggleModal = () => {
    setShowModal(!showModal)
  }
  
  const handleDelete = () => {
    onDelete(note._id)
    setShowOptions(false)
  }
  
  
  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content
    return content.substr(0, maxLength) + '...'
  }
  
  
  const getCardColor = () => {
    const colors = [
      'bg-white',
      'bg-primary-50',
      'bg-secondary-50',
      'bg-yellow-50',
      'bg-purple-50',
      'bg-pink-50'
    ]
    const id = note._id || ''
    const hashCode = id.split('').reduce((a, b) => (a * 31 + b.charCodeAt(0)) & 0xfffffff, 0)
    return colors[hashCode % colors.length]
  }
  
  return (
    <>
      <div 
        className={`${getCardColor()} rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-5 relative group animate-fade-in`}
      >
        <button 
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 focus:outline-none"
          onClick={toggleOptions}
        >
          <FiMoreVertical size={18} />
        </button>
        
        {showOptions && (
          <div className="absolute top-10 right-3 bg-white shadow-lg rounded-md py-2 z-10 min-w-32 animate-slide-up">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={() => {
                toggleModal()
                setShowOptions(false)
              }}
            >
              <FiEdit2 className="mr-2" />
              Edit
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
              onClick={handleDelete}
            >
              <FiTrash2 className="mr-2" />
              Delete
            </button>
          </div>
        )}
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{note.title}</h3>
        <p className="text-gray-600 whitespace-pre-line">{truncateContent(note.content)}</p>
        
        <div className="mt-4 text-xs text-gray-500">
          {note.updatedAt && (
            <p>
              Last updated: {new Date(note.updatedAt).toLocaleString()}
            </p>
          )}
        </div>
      </div>
      
      {showModal && (
        <NoteModal 
          note={note}
          isOpen={showModal}
          onClose={toggleModal}
          onUpdate={onUpdate}
          getNote={getNote}
        />
      )}
    </>
  )
}

export default NoteCard