const Navbar = () => {
    return (
      <header className="fixed top-0 w-full backdrop-blur-md bg-black/10 border-b border-white/5 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
          <h1 className="text-lg font-medium text-amberish tracking-tight">
            Stillroom
          </h1>
          <nav className="flex gap-6 text-sm text-neutral-400">
            <a href="#features" className="hover:text-amberish transition">
              Features
            </a>
            <a href="#mission" className="hover:text-amberish transition">
              Mission
            </a>
            <a href="#cta" className="hover:text-amberish transition">
              Start
            </a>
          </nav>
        </div>
      </header>
    );
}

export default Navbar;