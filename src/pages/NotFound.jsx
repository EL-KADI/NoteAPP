import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center px-4">
      <h1 className="text-7xl font-bold text-primary-600">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">Page not found</h2>
      <p className="mt-2 text-gray-600 text-center max-w-md">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link 
        to="/" 
        className="mt-8 btn btn-primary"
      >
        Go back home
      </Link>
    </div>
  )
}

export default NotFound