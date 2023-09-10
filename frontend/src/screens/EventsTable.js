import React from 'react';
import {Link} from "react-router-dom";
import {Button, Table} from "react-bootstrap";

function EventsTable(props) {
    const {events} = props;

    return (
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>дата</th>
                <th>описание</th>
                <th>адрес</th>
                <th>Управление</th>
            </tr>
            </thead>
            <tbody>
            {events?.map(event => (
                <tr key={event._id}>
                    <td>{event.id}</td>
                    <td>{event.name}</td>
                    <td>{event.date}</td>
                    <td>{event.description}</td>
                    <td>{event.students.map((student) => student.first_name).join(', ')}</td>

                    <td>

                    </td>
                </tr>
            ))}
            </tbody>

        </Table>
    )
}
export default EventsTable;