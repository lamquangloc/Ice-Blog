import SearchBar from "@/app/_components/search-bar";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="relative z-50 flex items-center justify-between py-6 max-w-7xl mx-auto px-5 lg:px-8">
      {/* Left: Logo & Name */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="relative w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:scale-110">
          <Image
            src="/favicon/favicon.ico"
            alt="IceBlog Logo"
            fill
            className="object-contain dark:invert"
          />
        </div>
        <span className="text-xl md:text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          IceBlog
        </span>
      </Link>

      {/* Right: Navigation & Search */}
      <div className="flex items-center gap-4">
        <SearchBar />
        <nav>
          <ul className="flex items-center gap-4 md:gap-8 text-sm md:text-base font-medium text-slate-600 dark:text-slate-300">
            <li>
              <Link
                href="/"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                Category
              </Link>
            </li>
            <li>
              <Link
                href="/tags"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                Tag
              </Link>
            </li>
            <li>
              <Link
                href="/certificates"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                Certificate
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
