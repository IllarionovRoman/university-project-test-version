import React from 'react';
import {Link} from "react-router-dom";
import {Button, Table} from "react-bootstrap";

function PodEventsTable(props) {
    const {podevents} = props;

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
            {podevents?.map(podevent => (
                <tr key={podevent._id}>
                    <td>{podevent.id}</td>
                    <td>{podevent.name}</td>
                    <td>{podevent.date}</td>
                    <td>{podevent.description}</td>
                    <td>{podevent.location}</td>

                    <td>

                    </td>
                </tr>
            ))}
            </tbody>

        </Table>
    )
}
export default PodEventsTable;