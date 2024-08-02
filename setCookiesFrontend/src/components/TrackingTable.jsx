// import React, { useEffect, useState } from 'react';
// import './TrackingTable.css';
// import Pagination from './Pagination';

// const TrackingTable = () => {
//   const [trackedData, setTrackedData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);

//   useEffect(() => {
//     fetch('http://localhost:3000/track')
//       .then(response => response.json())
//       .then(data => setTrackedData(data))
//       .catch(error => console.error('Error fetching tracked data:', error));
//   }, []);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = trackedData.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = pageNumber => setCurrentPage(pageNumber);

//   return (
//     <div className="tracking-table-container">
//       <h1>Tracked Data</h1>
//       <table className="tracking-table">
//         <thead>
//           <tr>
//             <th>URL</th>
//             <th>Referrer</th>
//             <th>UTM Source</th>
//             <th>UTM Medium</th>
//             <th>UTM Campaign</th>
//             <th>Device Type</th>
//             <th>User Agent</th>
//             <th>Timestamp</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.map(data => (
//             <tr key={data._id}>
//               <td>{data.url}</td>
//               <td>{data.referrer}</td>
//               <td>{data.utm_source}</td>
//               <td>{data.utm_medium}</td>
//               <td>{data.utm_campaign}</td>
//               <td>{data.device_type}</td>
//               <td>{data.user_agent}</td>
//               <td>{new Date(data.timestamp).toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <Pagination
//         itemsPerPage={itemsPerPage}
//         totalItems={trackedData.length}
//         paginate={paginate}
//         currentPage={currentPage}
//       />
//     </div>
//   );
// };

// export default TrackingTable;


import React, { useEffect, useState } from 'react';
import './TrackingTable.css';
import Pagination from './Pagination';

const TrackingTable = () => {
  const [trackedData, setTrackedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetch('http://localhost:3000/track')
      .then(response => response.json())
      .then(data => setTrackedData(data))
      .catch(error => console.error('Error fetching tracked data:', error));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = trackedData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="tracking-container">
      <h1>Tracked Data</h1>
      <table className="tracking-table">
        <thead>
          <tr>
            <th>URL</th>
            <th>Referrer</th>
            <th>UTM Source</th>
            <th>UTM Medium</th>
            <th>UTM Campaign</th>
            <th>Device Type</th>
            <th>User Agent</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(data => (
            <tr key={data._id}>
              <td style={{ maxWidth: '200px', overflowX: 'auto' }}>{data.url}</td>
              <td style={{ maxWidth: '200px', overflowX: 'auto' }}>{data.referrer}</td>
              <td>{data.utm_source}</td>
              <td>{data.utm_medium}</td>
              <td>{data.utm_campaign}</td>
              <td>{data.device_type}</td>
              <td style={{ maxWidth: '200px', overflowX: 'auto' }}>{data.user_agent}</td>
              <td>{new Date(data.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={trackedData.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default TrackingTable;
