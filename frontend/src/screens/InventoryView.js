import React, { useState, useEffect } from 'react';
import InventoryTable from './InventoryTable';

function InventoryPage() {
  const [inventorys, setInventorys] = useState([]);

  useEffect(() => {
    fetch('/api/inventory/')
      .then(response => response.json())
      .then(data => setInventorys(data));
  }, []);
    const exportToExcel = () => {
    const apiBaseUrl = "http://localhost:3000"; // Замените на ваш URL, если отличается
    const exportUrl = `${apiBaseUrl}/api/export-inventory-to-excel/`;
    window.open(exportUrl, "_blank");
  };
  return (
    <div>
      <h1>Инвентарь</h1>
      <button onClick={exportToExcel}>Экспортировать в Excel</button>
      <InventoryTable inventorys={inventorys} />
    </div>
  );
}

export default InventoryPage;