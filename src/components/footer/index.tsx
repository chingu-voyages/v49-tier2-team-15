const Footer = () => {
  return (
    <footer className="relative bottom-0 left-0 w-full bg-white rounded-lg dark:bg-background">
      <div className="w-full max-w-screen-xl py-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-xl font-bold text-transparent bg-gradient-to-r from-teal-500 via-orange-500 to-violet-700 bg-clip-text">
            Color Inspo
          </div>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}{' '}
          <a
            className="hover:underline"
            href="https://www.chingu.io/"
            target="_blank"
          >
            Chingu
          </a>
          . Voyage 49 - Tier 02 - Team 15
        </span>
      </div>
    </footer>
  );
};

export default Footer;
