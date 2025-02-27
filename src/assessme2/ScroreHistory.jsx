import { useState, useEffect } from "react";

const History = () => {
  const [scoreHistory, setScoreHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const historyPerPage = 10; // Number of entries per page

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("history")) || [];
    history.sort((a, b) => new Date(b.date) - new Date(a.date));
    setScoreHistory(history);
    setFilteredHistory(history);
  }, []);

  const handleSearch = () => {
    const filtered = scoreHistory.filter((entry) => {
      const entryDate = new Date(entry.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return (
        (!startDate || entryDate >= start) &&
        (!endDate || entryDate <= end)
      );
    });
    setFilteredHistory(filtered);
    setCurrentPage(1);
  };

  // Pagination logic
  const lastIndex = currentPage * historyPerPage;
  const firstIndex = lastIndex - historyPerPage;
  const currentHistory = filteredHistory.slice(firstIndex, lastIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const clearHistory = () => {
    localStorage.removeItem("history"); 
    setScoreHistory([]);
    setFilteredHistory([]); 
    alert('History Cleared');
  };

  return (
    <main className="flex flex-col flex-1 overflow-y-auto scrollbar items-center">
      <h1 className="text-4xl mt-5 font-bold text-center text-indigo-700 mb-12">Score History</h1>
      
      <div className="mb-4 flex items-center space-x-4 flex-wrap gap-2">
        <div className="flex flex-col gap-1 justify-center items-center">
          <label htmlFor="start_date">Start Date</label>
          <input
            type="date"
            value={startDate}
            id="start_date"
            onChange={(e) => setStartDate(e.target.value)}
            className="p-3 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Start Date"
          />
        </div>
        <div className="flex flex-col gap-1 justify-center items-center">
          <label htmlFor="end_date">End Date</label>
          <input
            type="date"
            id="end_date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-3 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="End Date"
          />
        </div>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          onClick={handleSearch}
        >
          Search
        </button>

        {/* Clear History Button */}
        <button
          className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
          onClick={clearHistory}
        >
          Clear History
        </button>
      </div>

      {/* History Table */}
      <div className="bg-white shadow rounded-lg w-full p-4 overflow-auto scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-3 px-4 text-gray-600 font-semibold">Date</th>
              <th className="py-3 px-4 text-gray-600 font-semibold">Course</th>
              <th className="py-3 px-4 text-gray-600 font-semibold">Score</th>
            </tr>
          </thead>
          <tbody id="scoreHistoryTable">
            {currentHistory.length > 0 ? (
              currentHistory.map((entry, index) => (
                <tr key={index}>
                  <td className="py-3 px-4 text-gray-700">{entry.date}</td>
                  <td className="py-3 px-4 text-gray-700">{entry.courseCode}</td>
                  <td className="py-3 px-4 text-gray-700">{entry.score}%</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-3 px-4 text-center text-gray-500">
                  No history available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {filteredHistory.length > historyPerPage && (
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Previous
          </button>
          <div className="text-gray-600">
            Page {currentPage} of {Math.ceil(filteredHistory.length / historyPerPage)}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredHistory.length / historyPerPage)}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
};

export default History;
