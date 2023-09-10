import React from 'react';
import {Link} from "react-router-dom";
import {Button, Table} from "react-bootstrap";

function InventoryTable(props) {
    const {inventorys} = props;

    return (

        <Table striped bordered hover responsive className='table-sm'>
            <thead>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>дата</th>
                <th>описание</th>
                <th>айди секции</th>
                <th>количество</th>
            </tr>
            </thead>
            <tbody>
            {inventorys?.map(inventory => (
                <tr key={inventory._id}>
                    <td>{inventory.id}</td>
                    <td>{inventory.name}</td>
                    <td>{inventory.date}</td>
                    <td>{inventory.description}</td>
                    <td>{inventory.sections}</td>
                    <td>{inventory.quantity}</td>
                    <td>

                    </td>
                </tr>
            ))}
            </tbody>

        </Table>
    )
}
export default InventoryTable;