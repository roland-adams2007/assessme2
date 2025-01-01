/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import questionsJson from "./questions.json";

function Questions({ handleIsQuestionsActive, setResults, setNavTab }) {
  const [courseCode, setCourseCode] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(900);
  const [timerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    handleIsQuestionsActive(true);
  }, []);

  useEffect(() => {
    const savedCourseCode = localStorage.getItem("courseCode");
    if (savedCourseCode) setCourseCode(savedCourseCode);
  }, []);

  useEffect(() => {
    const courseQuestions = questionsJson.find(
      (quest) => quest.courseCode === courseCode
    )?.questions;

    if (courseQuestions) {
      const randomQuestions = Object.values(courseQuestions)
        .sort(() => Math.random() - 0.5)
        .slice(0, 50);
      setQuestions(randomQuestions);
    } else {
      setQuestions([]);
    }
  }, [courseCode]);

  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          submitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 750);
    return () => clearInterval(interval);
  }, [timerRunning]);

  const currentQuestion = questions[currentQuestionIndex] || {};

  const handleNavigation = (direction) => {
    setCurrentQuestionIndex((prev) =>
      Math.min(
        Math.max(prev + direction, 0),
        questions.length - (direction < 0 ? 1 : 0)
      )
    );
  };

  const handleAnswerChange = (e) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = e.target.value;
    setSelectedAnswers(updatedAnswers);
  };

  const submitQuiz = (e) => {
    const results = questions.map((q, i) => ({
      question: q.question,
      selectedAnswer: selectedAnswers[i],
      correctAnswer: q.answer,
      isCorrect: selectedAnswers[i] === q.answer,
    }));
    handleIsQuestionsActive(false);
    setResults(results);
    setNavTab(e,"score");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Add dynamic class for timer color
  const timerClass = timeLeft <= 300 ? "text-red-500" : "text-yellow-400";

  return (
    <div
      className="flex flex-col flex-1 overflow-y-auto scrollbar"
      style={{ backgroundImage: "url(assets/images/notebook.jpg)", backgroundSize: "cover" }}
    >
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 px-3 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-semibold">{courseCode}</h1>
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <i className={`fas fa-clock text-2xl ${timerClass}`} />
              <span className={`text-lg font-bold ${timerClass}`}>{formatTime(timeLeft)}</span>
            </div>
            <span className="text-sm font-medium">
              <strong>{currentQuestionIndex + 1}</strong> /{" "}
              <strong>{questions.length}</strong>
            </span>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-gradient-to-r from-gray-300 to-blue-200 h-2">
        <div
          className="bg-blue-600 h-2 transition-all"
          style={{
            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
          }}
        ></div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto p-8 bg-white bg-opacity-90 rounded-xl shadow-xl mt-6 flex-1">
        {questions.length === 0 ? (
          <div className="text-center text-xl font-bold text-red-600">
            <p>No questions available for this course. Please choose another course.</p>
            <button
              onClick={(e) => setNavTab(e, "courseSelection")}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700"
            >
              Choose Another Course
            </button>
          </div>
        ) : (
          <div>
            {/* Question Info */}
            <div className="text-center mb-6">
              <h2 className="text-4xl font-semibold text-blue-800">Question {currentQuestionIndex + 1}</h2>
              <p className="text-gray-600 text-xl mt-3">{currentQuestion.question}</p>
            </div>

            {/* Answer Options */}
            <form>
              <div className="grid gap-4 mb-8">
                {currentQuestion.options?.map((option, idx) => (
                  <label
                    key={idx}
                    className={`block p-3 border-2 rounded-lg shadow-md transition-all cursor-pointer transform hover:scale-105 ${
                      selectedAnswers[currentQuestionIndex] === option
                        ? "bg-blue-100 border-blue-500"
                        : "bg-gray-50 border-gray-300 hover:bg-blue-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={selectedAnswers[currentQuestionIndex] === option}
                      onChange={handleAnswerChange}
                      className="mr-4"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={() => handleNavigation(-1)}
                  className="bg-gray-400 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-500 disabled:opacity-50"
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={(e) =>
                    currentQuestionIndex + 1 === questions.length
                      ? submitQuiz(e)
                      : handleNavigation(1)
                  }
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700"
                >
                  {currentQuestionIndex + 1 === questions.length ? "Submit" : "Next"}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default Questions;
