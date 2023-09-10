import React, { useState, useEffect } from 'react';
import EventsTable from './EventsTable';

function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events/')
      .then(response => response.json())
      .then(data => setEvents(data));
  }, []);

  return (
    <div>
      <h1>Events</h1>
      <EventsTable events={events} />
    </div>
  );
}

export default EventsPage;