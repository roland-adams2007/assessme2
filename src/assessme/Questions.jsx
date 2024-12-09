import { useState, useEffect } from "react";
import questionsJson from './questions.json';
import { useNavigate } from "react-router-dom";

function Questions() {
  const navigate = useNavigate();
  const [courseCode, setCourseCode] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(900);
  const [timerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    if (!(localStorage.getItem('course_code'))) {
      return;
    } else {
      setCourseCode(localStorage.getItem('course_code'));
    }
  }, []);

  useEffect(() => {
    const courseQuestions = questionsJson.filter(
      (quest) => quest.courseCode === courseCode
    );
    
    if (courseQuestions.length > 0) {
      const questionsObject = courseQuestions[0].questions;
      
      const questionsArray = Object.keys(questionsObject).map(key => questionsObject[key]);
      
      const randomQuestions = questionsArray.sort(() => Math.random() - 0.5).slice(0, 50);
      
      setQuestions(randomQuestions); 
    } else {
      setQuestions([]); // Set empty array if no questions for the course
    }
  }, [courseCode]);

  useEffect(() => {
    if (timerRunning) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval);
            setTimerRunning(false); 
            submitQuiz();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerRunning]);

  const currentQuestion = questions[currentQuestionIndex] || {};
  const currentQuestionText = currentQuestion.question || '';
  const currentOptions = currentQuestion.options || [];

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (window.confirm("Are you sure you want to submit the quiz?")) {
        submitQuiz();
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerChange = (e) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = e.target.value;
    setSelectedAnswers(newSelectedAnswers);
  };

  const submitQuiz = () => {
    const results = questions.map((question, index) => {
      const selectedAnswer = selectedAnswers[index];
      const correctAnswer = question.answer;
      return({
        question: question.question,
        selectedAnswer,
        correctAnswer:correctAnswer,
        isCorrect: selectedAnswer === correctAnswer
      });
    });
    navigate('/score', { state: { results } });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <>
      <title>AssessMe - Questions</title>
      <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url(assets/images/notebook.jpg)" }}>
        <header className="bg-opacity-60 bg-blue-600 text-white py-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-semibold">{courseCode}</h1>
            <div className="flex space-x-8 items-center">
              <div className="flex items-center space-x-2">
                <i className="fas fa-clock text-yellow-400" />
                <span id="timer" className="text-lg font-medium">
                  {formatTime(timeLeft)}
                </span>
              </div>
              <div className="text-sm">
                <span className="font-medium">{currentQuestionIndex + 1}</span> of 
                <span className="font-medium"> {questions.length}</span> Answered
              </div>
            </div>
          </div>
        </header>
        <div className="w-full bg-gray-200 h-2">
          <div
            id="progress-bar"
            className="bg-blue-500 h-2"
            style={{
              width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
        <main className="container mx-auto flex-1 mt-8 p-6 rounded-lg shadow-md bg-white bg-opacity-90">
          {questions.length === 0 ? (
            <div className="text-center text-xl font-semibold text-red-600">
              <p>No questions available for this course. Please choose another course.</p>
              <button 
                onClick={() => navigate('/course')}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Choose Another Course
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Question {currentQuestionIndex + 1}</h2>
                <p className="text-gray-600 mt-2">{currentQuestionText}</p>
              </div>
              <form>
                <div className="grid grid-cols-1 gap-4">
                  {currentOptions.map((option, index) => (
                    <label
                      key={index}
                      className={`block bg-gray-50 border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-blue-100 hover:border-blue-500 transition ${selectedAnswers[currentQuestionIndex] === option ? "bg-blue-100" : ""}`}
                    >
                      <input
                        type="radio"
                        name="answer"
                        value={option}
                        onChange={handleAnswerChange}
                        checked={selectedAnswers[currentQuestionIndex] === option}
                        className="mr-2"
                      />
                      <span className="text-gray-800">{option}</span>
                    </label>
                  ))}
                </div>
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-500 transition"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                  >
                    {currentQuestionIndex + 1 === questions.length ? 'Submit' : 'Next'}
                  </button>
                </div>
              </form>
            </>
          )}
        </main>
        <footer className="bg-blue-600 text-white text-center py-4 mt-8">
          <p>© 2024 AssessMe. All Rights Reserved.</p>
          <p className="mt-2">
            Made with ❤️ by Roland Adams, Department of Educational Technology
          </p>
        </footer>
      </div>
    </>
  );
}

export default Questions;
