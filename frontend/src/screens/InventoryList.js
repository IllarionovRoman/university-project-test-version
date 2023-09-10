import React, { useState } from 'react';
import axios from 'axios';

function InventoryList() {
  const [inventorys, setInventorys] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (inventory) => {
    setStartDate(inventory.target.value);
  };

  const handleEndDateChange = (inventory) => {
    setEndDate(inventory.target.value);
  };

  const handleSearch = () => {
    axios.get('/api/inventory/', {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
    })
    .then(response => {
      setInventorys(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  };

  return (
    <div>
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
          {inventorys.map(inventory => (
            <tr key={inventory.id}>
              <td>{inventory.name}</td>
              <td>{inventory.description}</td>
              <td>{inventory.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryList;