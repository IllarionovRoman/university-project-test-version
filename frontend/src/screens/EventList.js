import React, { useState } from 'react';
import axios from 'axios';

function EventList() {
  const [products, setProducts] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSearch = () => {
    axios.get('/api/events/', {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
    })
    .then(response => {
      setProducts(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  };

  return (
    <div>
      <h1>Events</h1>
      <div>
        <label htmlFor="start-date">Start Date:</label>
        <input id="start-date" type="date" value={startDate}onChange={handleStartDateChange} />
      </div>
      <div>
        <label htmlFor="end-date">End Date:</label>
        <input id="end-date" type="date" value={endDate} onChange={handleEndDateChange} />
      </div>
      <button onClick={handleSearch}>Search</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventList;