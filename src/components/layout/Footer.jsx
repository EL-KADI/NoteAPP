import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-6 border-t border-gray-200">
      <div className="container-custom text-center">
        <p className="text-gray-600 flex items-center justify-center">
          Made with <FiHeart className="text-red-500 mx-1" /> NotesApp ©
          {currentYear}
        </p>
        <div className="mt-2 flex justify-center space-x-4">
          <Link className="text-gray-500 hover:text-primary-600 transition-colors">
            Terms
          </Link>
          <Link className="text-gray-500 hover:text-primary-600 transition-colors">
            Privacy
          </Link>
          <Link className="text-gray-500 hover:text-primary-600 transition-colors">
            Help
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
