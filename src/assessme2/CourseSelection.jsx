import { useState, useEffect } from "react";
import questions from "./questions.json";

const CourseSelection = ({setNavTab}) => {
  const [searchWord, setSearchWord] = useState("");
  const [searchedCourse, setSearchedCourse] = useState(questions);

  const handleSearch = (e) => {
    const word = e.target.value ? e.target.value.toLowerCase() : "";
    setSearchWord(word);

    if (!word) {
      setSearchedCourse(questions);
      return;
    }

    const filteredData = questions.filter((course) =>
      course.courseCode.toLowerCase().includes(word)
    );

    setSearchedCourse(filteredData);
  };

  const handleSelectCourse = (e,selectedCourseCode) => {
     localStorage.setItem('courseCode',selectedCourseCode);
     setNavTab(e,'questions');
  };

  return (
    <>
      <main className="flex-1 p-6 overflow-y-auto scrollbar flex flex-col">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Courses Selection
        </h2>

        <div className="mb-4">
          <input
            type="text"
            className="w-full p-3 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search courses..."
            name="search"
            value={searchWord}
            onChange={handleSearch}
          />
        </div>

        {searchedCourse.length > 0 ? (
            <div className="h-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {searchedCourse.map((course) => (
                    <div
                    key={course.courseCode}
                    className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-transform transform hover:-translate-y-2 hover:border-blue-400"
                    >
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {course.courseCode}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {course.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-700 font-medium mt-4">
                        <p className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md shadow-sm">
                        Level: {course.level}
                        </p>
                    </div>
                    <button
                        onClick={(e) => handleSelectCourse(e,course.courseCode)}
                        className="mt-4 w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 hover:shadow-md transition"
                    >
                        Proceed
                    </button>
                    </div>
                ))}
                </div>
            </div>
        ) : (
            <p className="text-gray-500 text-center mt-6">No Available Courses</p>
        )}

      </main>
    </>
  );
};

export default CourseSelection;
