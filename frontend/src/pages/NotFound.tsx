import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080b0e] px-6">
      <div className="max-w-md w-full text-center">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full border border-[#00ff9d55]
                          flex items-center justify-center
                          shadow-[0_0_25px_#00ff9d33]">
            <AlertTriangle className="w-8 h-8 text-[#00ff9d]" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-semibold text-white tracking-wide">
          404
        </h1>

        <p className="mt-2 text-lg text-[#9ef0c7]">
          Page Not Found
        </p>

        {/* Description */}
        <p className="mt-4 text-sm text-gray-400 leading-relaxed">
          The page you are trying to access doesn’t exist or has been moved.
          Please verify the URL or return to the homepage.
        </p>

        {/* CTA */}
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center
                       px-6 py-3 rounded-md
                       bg-[#00ff9d] text-black font-medium
                       hover:bg-[#00e68f]
                       transition-all duration-200
                       shadow-[0_0_20px_#00ff9d55]"
          >
            Go to Home
          </Link>
        </div>

        {/* Footer hint */}
        <p className="mt-6 text-xs text-gray-600">
          Xsploit Security Platform
        </p>
      </div>
    </div>
  );
};

export default NotFound;
