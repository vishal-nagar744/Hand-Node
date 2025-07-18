import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white shadow-lg border-b-2 border-white/20">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold tracking-wide hover:text-yellow-300 transition-all duration-300 hover:scale-110 animate-fade-in"
        >
          🖐️ HandApp
        </Link>
        <div className="space-x-8 text-lg font-medium">
          <Link 
            to="/dashboard" 
            className="hover:text-yellow-200 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-white/10 hover:shadow-md"
          >
            📊 Dashboard
          </Link>
          <Link 
            to="/profile" 
            className="hover:text-yellow-200 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-white/10 hover:shadow-md"
          >
            👤 Profile
          </Link>
          <Link 
            to="/login" 
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 backdrop-blur-sm"
          >
            🔐 Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
