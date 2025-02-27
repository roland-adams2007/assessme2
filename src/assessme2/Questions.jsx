
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import questionsJson from "./questions.json";

function Questions({ setResults, setNavTab }) {
  const [courseCode, setCourseCode] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(900);

  // Load course code from localStorage on mount
  useEffect(() => {
    const savedCourseCode = localStorage.getItem("courseCode");
    if (savedCourseCode) {
      setCourseCode(savedCourseCode);
    }
  }, []);

  // Load questions, answers, and time from localStorage or initialize them
  useEffect(() => {
    if (!courseCode) return;

    const savedQuestions = JSON.parse(localStorage.getItem(`questions_${courseCode}`));
    const savedAnswers = JSON.parse(localStorage.getItem(`answers_${courseCode}`));
    const savedTime = parseInt(localStorage.getItem(`timeLeft_${courseCode}`), 10);

    if (savedQuestions && savedQuestions.length > 0) {
      setQuestions(savedQuestions);
      if (savedAnswers) setSelectedAnswers(savedAnswers);
    } else {
      const courseQuestions = questionsJson.find(
        (quest) => quest.courseCode === courseCode
      )?.questions;

      if (courseQuestions) {
        const randomQuestions = Object.values(courseQuestions)
          .sort(() => Math.random() - 0.5)
          .slice(0, 50);
        setQuestions(randomQuestions);
        localStorage.setItem(`questions_${courseCode}`, JSON.stringify(randomQuestions));
      } else {
        setQuestions([]);
      }
    }

    // Initialize the timer
    if (!isNaN(savedTime)) {
      setTimeLeft(savedTime);
    } else {
      localStorage.setItem(`timeLeft_${courseCode}`, 900);
    }
  }, [courseCode]);

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      submitQuiz();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTimeLeft = prev - 1;
        localStorage.setItem(`timeLeft_${courseCode}`, newTimeLeft);
        return newTimeLeft;
      });
    }, 750);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // Save selected answers to localStorage
  useEffect(() => {
    if (courseCode && selectedAnswers.length > 0) {
      localStorage.setItem(`answers_${courseCode}`, JSON.stringify(selectedAnswers));
    }
  }, [selectedAnswers, courseCode]);

  const currentQuestion = questions[currentQuestionIndex] || {};

  const handleNavigation = (direction) => {
    setCurrentQuestionIndex((prev) =>
      Math.min(Math.max(prev + direction, 0), questions.length - 1)
    );
  };

  const handleBoxNavigation = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleAnswerChange = (e) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = e.target.value;
    setSelectedAnswers(updatedAnswers);
  };

  const submitQuiz = () => {
    localStorage.removeItem(`timeLeft_${courseCode}`);
    localStorage.removeItem(`questions_${courseCode}`);
    localStorage.removeItem(`answers_${courseCode}`);
    const results = questions.map((q, i) => ({
      question: q.question,
      selectedAnswer: selectedAnswers[i],
      correctAnswer: q.answer,
      isCorrect: selectedAnswers[i] === q.answer,
    }));
    setResults(results);
    setNavTab("score");
  };

  const handleSubmitQuiz = (e) => {
    e.preventDefault();
    const userConfirmed = confirm("Are you sure you want to submit?");
    if (userConfirmed) {
      submitQuiz();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const timerClass = timeLeft <= 300 ? "text-red-500" : "text-yellow-400";

  return (
    <div
      className="flex flex-col flex-1 overflow-y-auto scrollbar"
      style={{ backgroundImage: "url(assets/images/notebook.jpg)", backgroundSize: "cover" }}
    >
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 sticky top-0 z-20 left-0 text-white py-6 px-3 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-semibold">{courseCode}</h1>
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <i className={`fas fa-clock text-2xl ${timerClass}`} />
              <span className={`text-lg font-bold ${timerClass}`}>{formatTime(timeLeft)}</span>
            </div>
            <div>
              {(timeLeft <= 350 || selectedAnswers.length >= questions.length / 2) && (
                <div>
                  <button
                    type="button"
                    onClick={(e) => handleSubmitQuiz(e)}
                    className="bg-blue-600 text-white px-6 py-2 text-sm rounded-lg shadow-lg hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-8 bg-white bg-opacity-90 rounded-xl shadow-xl mt-6 flex-1">
        {questions.length === 0 ? (
          <div className="text-center text-xl font-bold text-red-600">
            <p>No questions available for this course. Please choose another course.</p>
            <button
              onClick={() => setNavTab("courseSelection")}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700"
            >
              Choose Another Course
            </button>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <span className="text-sm font-medium shadow-md rounded-md py-1 px-5 bg-blue-600 text-white">
                <strong>{currentQuestionIndex + 1}</strong> / <strong>{questions.length}</strong>
              </span>
              <h2 className="text-4xl font-semibold text-blue-800 mt-2">Question {currentQuestionIndex + 1}</h2>
              <p className="text-gray-600 text-xl mt-3 break-words">
                <span dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
              </p>
            </div>

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

              <div className="flex justify-between mb-8">
                <button
                  type="button"
                  onClick={() => handleNavigation(-1)}
                  className={`bg-gray-400 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-500 disabled:opacity-50 ${
                    currentQuestionIndex === 0 ? "hidden" : ""
                  }`}
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigation(1)}
                  className={`bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 ${
                    currentQuestionIndex + 1 === questions.length ? "hidden" : ""
                  }`}
                >
                  Next
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2 mb-8">
                {questions.map((_, index) => {
                  const isAnswered = !!selectedAnswers[index];
                  const isCurrent = index === currentQuestionIndex;

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleBoxNavigation(index)}
                      className={`w-12 h-12 rounded-full font-bold ${
                        isCurrent
                          ? "bg-blue-600 text-white"
                          : isAnswered
                          ? "bg-green-500 text-white"
                          : "bg-gray-400 text-white"
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default Questions;

