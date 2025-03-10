import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 ">
      <div className="max-w-3xl shadow-xl rounded-2xl p-8 md:p-12 transition-all">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center">
          About <span className="text-blue-600">BookHub</span>
        </h1>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed text-center mt-4">
          BookHub is your ultimate destination for discovering, tracking, and
          sharing books. Whether you're a casual reader or a bookworm, we bring
          you the best recommendations and a thriving reading community.
        </p>

        {/* Features Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 text-center">
            Why Choose BookHub?
          </h2>
          <ul className="mt-4 space-y-3 text-gray-700 dark:text-gray-300 text-lg">
            <li className="flex items-center gap-3">
              📖{" "}
              <span>
                Personalized book recommendations tailored to your interests.
              </span>
            </li>
            <li className="flex items-center gap-3">
              ⭐ <span>Rate and review books to guide fellow readers.</span>
            </li>
            <li className="flex items-center gap-3">
              🔍{" "}
              <span>Search and filter books by genre, author, or rating.</span>
            </li>
            <li className="flex items-center gap-3">
              📚{" "}
              <span>
                Save books to your reading list and track your progress.
              </span>
            </li>
            <li className="flex items-center gap-3">
              🤝 <span>Engage with a community of passionate book lovers.</span>
            </li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="mt-10 text-center">
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Start your journey with us and explore a world of books! 📚✨
          </p>
          <Link to="/store">
            <button className="mt-5 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
