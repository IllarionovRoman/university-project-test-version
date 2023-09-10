import React, { useState, useEffect } from 'react';
import PodEventsTable from './PodEventsTable';

function PodEventsPage() {
  const [podevents, setPodevents] = useState([]);

  useEffect(() => {
    fetch('/api/podevents/')
      .then(response => response.json())
      .then(data => setPodevents(data));
  }, []);

  return (
    <div>
      <h1>Events</h1>
      <PodEventsTable podevents={podevents} />
    </div>
  );
}

export default PodEventsPage;