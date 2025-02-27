/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

function Score({ setNavTab, results }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [history, setHistory] = useState([]);
  const questionsPerPage = 4;

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(savedHistory);

    if (results) {
      const courseCode = localStorage.getItem("courseCode");
      const correctScore = results.filter((res) => res.isCorrect).length;
      const unanswered = results.filter((res) => !res.selectedAnswer).length;
      const wrongScore = results.length - correctScore - unanswered;
      const percentageScore = (correctScore / results.length) * 100;

      const newHistoryEntry = {
        courseCode,
        score: percentageScore,
        correct: correctScore,
        wrong: wrongScore,
        unanswered,
        date: new Date().toLocaleString(),   
      };

      const updatedHistory = [...savedHistory, newHistoryEntry];
      setHistory(updatedHistory);
      localStorage.setItem("history", JSON.stringify(updatedHistory));
    }
    console.log('added');
  }, [results]);

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-bold text-gray-700">No results available.</h2>
      </div>
    );
  }

  let correctScore = results.filter((res) => res.isCorrect).length;
  let wrongScore = results.filter((res) => !res.isCorrect && res.selectedAnswer).length;
  let unanswered = results.filter((res) => !res.selectedAnswer).length;
  const totalQuestions = results.length;

  const percentageScore = totalQuestions === 0 ? 0 : (correctScore / totalQuestions) * 100;

  // Function to generate PDF
  const downloadResult = () => {
    const doc = new jsPDF();
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text('AssessMe', 20, 20);
    doc.setLineWidth(0.5);
    doc.line(20, 30, 190, 30);
    doc.setFontSize(22);
    doc.setFont("helvetica", "normal");
    doc.text('Your Score Report', 20, 40);
    doc.text('', 20, 50);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(`Total Score: ${percentageScore.toFixed(2)}%`, 20, 60);
    doc.text('', 20, 70);
    doc.setFont("helvetica", "normal");
    doc.text(`Correct Answers: ${correctScore}/${totalQuestions}`, 20, 80);
    doc.text(`Wrong Answers: ${wrongScore}/${totalQuestions}`, 20, 90);
    doc.text(`Unanswered: ${unanswered}/${totalQuestions}`, 20, 100);
    doc.text('', 20, 110);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text('Review of Your Answers:', 20, 120);
    doc.text('', 20, 130);
    let yOffset = 140;
    const pageHeight = doc.internal.pageSize.height;
    results.forEach((result, index) => {
      if (yOffset > pageHeight - 40) {
        doc.addPage();
        yOffset = 20;
      }
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setFont("helvetica", "bold");
      doc.text(`${index + 1}. ${result.question}`, 20, yOffset);
      doc.setFont("helvetica", "normal");
      doc.text(`Your Answer: ${result.selectedAnswer || 'Unanswered'}`, 20, yOffset + 10);
      doc.text(`Correct Answer: ${result.correctAnswer}`, 20, yOffset + 20);
      doc.setFont("helvetica", "italic");
      const status = result.isCorrect ? 'Correct' : 'Wrong';
      const color = result.isCorrect ? [0, 128, 0] : [255, 0, 0];
      doc.setTextColor(color[0], color[1], color[2]);
      doc.text(`Status: ${status}`, 20, yOffset + 30);
      doc.setTextColor(0, 0, 0);
      yOffset += 40;
    });
    doc.text('', 20, yOffset);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text('Generated by AssessMe', 20, yOffset + 10);
    doc.text(`© ${new Date().getFullYear()} All Rights Reserved`, 150, yOffset + 10);
    doc.save('result.pdf');
  };

  const currentQuestions = results.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  const handleNext = () => {
    if ((currentPage + 1) * questionsPerPage < totalQuestions) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleStartOver = () => {
    setNavTab('questions');
  };

  const handleChooseCourse = () => {
    localStorage.removeItem('courseCode');
    setNavTab('courseSelection');
  };

  return (
    <>
      <div className="flex flex-col flex-1 overflow-y-auto scrollbar items-center">
        <div className="w-full max-w-5xl bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-4xl font-bold text-center text-indigo-700 mb-12">
            <i className="fas fa-trophy text-indigo-600 mr-3" /> Your Score
          </h1>
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Total Score: {percentageScore.toFixed(2) + '%'}
            </h2>
            <div className="relative pt-1 mb-6">
              <div className="flex mb-2 items-center justify-between">
                <span className="text-sm font-semibold">Total Score Progress</span>
                <span className="text-xs font-semibold text-indigo-600">{percentageScore.toFixed(2) + '%'}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-indigo-600 h-3 rounded-full"
                  style={{
                    width: `${percentageScore.toFixed(2)}%`,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-green-100 p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <i className="fas fa-check-circle text-green-600 text-3xl mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Correct Answers</h3>
              </div>
              <p className="text-gray-700 text-lg">{correctScore}/{totalQuestions}</p>
            </div>
            <div className="bg-red-100 p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <i className="fas fa-times-circle text-red-600 text-3xl mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Wrong Answers</h3>
              </div>
              <p className="text-gray-700 text-lg">{wrongScore}/{totalQuestions}</p>
            </div>
            <div className="bg-yellow-100 p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <i className="fas fa-question-circle text-yellow-600 text-3xl mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Unanswered</h3>
              </div>
              <p className="text-gray-700 text-lg">{unanswered}/{totalQuestions}</p>
            </div>
          </div>
          <div className="bg-indigo-50 p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Review Answers
            </h3>
            {currentQuestions.map((result, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{index + 1}. {result.question}</span>
                  <span className={`font-bold ${result.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {result.isCorrect ? 'Correct' : 'Wrong'}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Your Answer:</strong> {result.selectedAnswer || 'Unanswered'}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Correct Answer:</strong> {result.correctAnswer}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              className="text-indigo-600"
              onClick={handlePrev}
              disabled={currentPage === 0}
            >
              Prev
            </button>
            <button
              className="text-indigo-600"
              onClick={handleNext}
              disabled={(currentPage + 1) * questionsPerPage >= totalQuestions}
            >
              Next
            </button>
          </div>

          <div className="flex justify-between mt-8">
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
              onClick={handleStartOver}
            >
              Start Over
            </button>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
              onClick={downloadResult}
            >
              Download PDF
            </button>
            <button
              className="text-indigo-600"
              onClick={handleChooseCourse}
            >
              Choose Course
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Score;
