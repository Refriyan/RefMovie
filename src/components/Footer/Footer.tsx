const Footer = () => {
  return (
    <footer className="mt-16 border-t border-white/10 py-8 text-center text-gray-400 text-sm">
      <p>© {new Date().getFullYear()} RefMovie</p>
      <p className="mt-1">Built with React + TMDB API 🎬</p>
    </footer>
  );
};

export default Footer;
