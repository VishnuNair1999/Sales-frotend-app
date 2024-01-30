import React, { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateDetailTable,
  
} from '../actions/detailTableActions';
import './DetailTable.css'; // Import the CSS file

const DetailTable = () => {
  const dispatch = useDispatch();
  const detailTableState = useSelector((state) => state.detailTable);

  const [errors, setErrors] = useState([]);  // Add this line
  const [formData, setFormData] = useState({
    rows: [],
  });
  useEffect(() => {
    // Update formData.rows when detailTableState.rows changes
    setFormData({
      rows: detailTableState.rows || [],
    });
  }, [detailTableState.rows]);

  const handleChange = (index, field, value) => {
    // console.log('hang')
    // let newErrors = [...errors];
    // if (field === 'quantities' || field === 'prices' || field === 'itemCode' || field === 'itemName') {
    //   if (!value.trim()) {
    //     newErrors[index] = 'Enter all necessary details';
    //   } else {
    //     newErrors[index] = '';
    //   }
    // }
    // console.log('New Errors:', newErrors); 

    const updatedRows = [...formData.rows];
    const updatedRow = {
      ...updatedRows[index],
      [field]: value,
    };

    updatedRows[index] = updatedRow;
    let newErrors = updatedRows.map(row => (
      (!row.itemCode || !row.itemName || !row.quantities || !row.prices) ? 'Enter all necessary details' : ''
    ));

    setFormData({
      ...formData,
      rows: updatedRows,
    });
    setErrors(newErrors);
    dispatch(updateDetailTable(updatedRows));
  };

  const handleAddRow = () => {
    const updatedRows = [...formData.rows, {}];
    setFormData({
      ...formData,
      rows: updatedRows,
    });

    dispatch(updateDetailTable(updatedRows));
  };

  const handleRemoveRow = (index) => {
    const updatedRows = [...formData.rows];
    updatedRows.splice(index, 1);

    setFormData({
      ...formData,
      rows: updatedRows,
    });

    dispatch(updateDetailTable(updatedRows));
  };

  const calculateTotalSumPrice = (row) => {
    const quantities = parseInt(row.quantities, 10) || 0;
    const prices = parseFloat(row.prices) || 0;
    return quantities * prices;
  };
  const calculateTotalAmount = () => {
    return formData.rows.reduce((sum, row) => sum + calculateTotalSumPrice(row), 0);
  };

  return (
    <div className="detail-table-container">
      
      <table className="excel-sheet">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Quantities</th>
            <th>Prices</th>
            <th>Total Sum Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {formData.rows.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  value={row.itemCode || ''}
                  onChange={(e) => handleChange(index, 'itemCode', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.itemName || ''}
                  onChange={(e) => handleChange(index, 'itemName', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.quantities || ''}
                  min={2}
                  max={18}
                  onChange={(e) => handleChange(index, 'quantities', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.prices || ''}
                  min={3}
                  max={100000000000000000n}
                  onChange={(e) => handleChange(index, 'prices', e.target.value)}
                />
              </td>
              <td>{calculateTotalSumPrice(row)}</td>
              <td>
                <button onClick={() => handleRemoveRow(index)}>Remove</button>
                {errors[index] !== undefined && errors[index] !== '' && (
  <span className="error-message">{errors[index]}</span>
)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-box">
        <div>Total Amount:{calculateTotalAmount()}</div>
        
      </div>
      <button onClick={handleAddRow}>Add Row</button>
    </div>
  );
};

export default DetailTable;
