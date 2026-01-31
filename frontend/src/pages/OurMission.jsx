import React from "react";

export default function OurMission() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-600 mb-4">
            Our Mission
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Making waste management easier, smarter, and more responsible for everyone.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <p>
            Dealing with different types of waste — especially those that
            are difficult to decompose like <strong>electronic waste</strong>,
            <strong>paper</strong>, and <strong>cloth</strong> — can be a
            challenge for citizens. These materials often remain in the
            environment for years if not handled properly.
          </p>

          <p>
            That’s why we built this Waste Management System: to help
            users easily categorize and submit waste pickup requests. You
            can select your waste type and let us know when and where it
            needs to be picked up.
          </p>

          <p>
            On the administrative side, the government has full
            capabilities to assign drivers and manage collection routes
            based on waste type and user requests — improving efficiency
            and responsible waste disposal.
          </p>

          <blockquote className="border-l-4 border-indigo-600 pl-4 italic text-gray-600 dark:text-gray-400">
            “Responsible waste management starts with clarity, choice, and community collaboration.”
          </blockquote>
        </div>

        {/* Waste Category Examples */}
        <div>
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Common Waste Types</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl">📱 Electronic Waste</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Items like old phones, batteries, chargers, and other electronics that
                are hazardous if not recycled properly.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl">📄 Paper Waste</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Newspapers, books, cardboard, and other paper materials that can be
                recycled.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl">👕 Cloth Waste</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Old clothes, textiles, and fabrics that should be reused or recycled.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl">🧴 Other Waste</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Other difficult-to-decompose items like plastics, glass, and more.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
