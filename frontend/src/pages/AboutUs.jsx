import React from "react";

export default function AboutUs() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-600 mb-4">
            About Us
          </h1>
          <p className="text-lg font-medium">
            Empowering communities with smarter waste management solutions.
          </p>
        </div>

        {/* Who We Are */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-indigo-600">
            Who We Are
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            At the heart of every clean and thriving community lies
            efficient and smart waste management. Our Waste Management
            System was built with one core belief:
          </p>

          <blockquote className="border-l-4 border-indigo-600 pl-4 italic text-gray-600 dark:text-gray-400">
            “Cleaner cities begin with smarter waste solutions.”
          </blockquote>

          <p className="text-gray-700 dark:text-gray-300">
            This platform brings technology and purpose together —
            connecting users, drivers, and administrators in a seamless
            workflow that improves waste collection, reduces environmental
            impact, and makes everyday operations more efficient.
          </p>
        </div>

        {/* What We Do */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-indigo-600">
            What We Do
          </h2>

          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>📍 Report and track waste pickup requests</li>
            <li>🚚 Assign and manage driver routes</li>
            <li>📊 Monitor operations with user-friendly dashboards</li>
            <li>🛠️ Streamline communication between users and service teams</li>
          </ul>

          <p className="text-gray-700 dark:text-gray-300">
            We’ve designed this tool to be intuitive, responsive, and
            adaptable — enabling a smarter way to handle waste
            management challenges in modern communities.
          </p>
        </div>

        {/* Vision Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-indigo-600">
            Our Vision
          </h2>

          <p className="text-gray-700 dark:text-gray-300">
            We envision a future where communities work together for a
            sustainable, waste-free world. By leveraging innovative
            solutions and efficient workflows, we aim to make environmental
            responsibility easier for everyone.
          </p>

          <blockquote className="border-l-4 border-indigo-600 pl-4 italic text-gray-600 dark:text-gray-400">
            “Smart systems. Cleaner planet. Better tomorrow.”
          </blockquote>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-4">
          <p className="text-lg text-indigo-600 font-semibold">
            Join Us on the Journey
          </p>

          <blockquote className="border-l-4 border-indigo-600 pl-4 italic text-gray-600 dark:text-gray-400">
            “Together, let’s make waste management seamless and effective.”
          </blockquote>

          <div className="flex justify-center gap-4">
            <a
              href="/contact"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Contact Us
            </a>
            <a
              href="/services"
              className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
            >
              Explore Services
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
