const Footer = () => {
  return (
    <div className="text-center py-4">
      <p className="text-xs text-gray-500">
        By signing in, you agree to our{' '}
        <a href="#" className="text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
          Terms of Service
        </a>
        {' '}and{' '}
        <a href="#" className="text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
          Privacy Policy
        </a>
      </p>
    </div>
  );
};

export default Footer;
