const Navbar = () => {
    return (
      <header className="fixed top-0 filter backdrop-blur-sm w-full bg-(--pure-black)/90 shadow-lg/40 border-b border-(--pure-graphite) text-(--pure-white) z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4 max-md:px-4">
          <h1 className="text-xl font-medium text-(--pure-white) tracking-wider">
            Stillroom
          </h1>
          <nav className="flex gap-6 text-sm">
            <a href="#features" className="transition">
              Features
            </a>
            <a href="#mission" className="transition">
              Mission
            </a>
            <a href="#cta" className="transition">
              Start
            </a>
          </nav>
        </div>
      </header>
    );
}

export default Navbar;