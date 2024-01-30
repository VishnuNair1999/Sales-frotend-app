// HeaderTable.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateVrNo,
  updateVrDate,
  updateAcName,
  updateAcAmt,
  updateStatus,
  resetDetailTable
} from "../actions/headerTableActions";
// import {resetDetailTable} from '../actions/detailTableActions'
import './HeaderTable.css'; // Import your CSS file
import axios from 'axios';
import jsPDF from 'jspdf';


const HeaderTable = () => {
  const dispatch = useDispatch();
  const headerTableState = useSelector((state) => state.headerTable);
  const detailTableState = useSelector((state) => state.detailTable);

  const [errors, setErrors] = useState({
    vr_no: '',
    vr_date: '',
    ac_name: '',
    ac_amt: '',
  });

  const [formData, setFormData] = useState({
    vr_no: headerTableState.vr_no || '',
    vr_date: headerTableState.vr_date || '',
    ac_name: headerTableState.ac_name || '',
    ac_amt: headerTableState.ac_amt || '',
    status: headerTableState.status || '',
  });

  useEffect(() => {
    // Calculate the total sum price from the detail table
    const totalSumPrice = detailTableState.rows.reduce((sum, row) => {
      const quantities = parseInt(row.quantities, 10) || 0;
      const prices = parseFloat(row.prices) || 0;
      return sum + quantities * prices;
    }, 0);

    // Update the Account Amount in the form data
    setFormData((prevData) => ({
      ...prevData,
      ac_amt: totalSumPrice.toFixed(2), // Adjust to your desired formatting
    }));
  }, [detailTableState.rows]);

  const handleChange = (e) => {
    const { name, value } = e.target;
        // Basic validation
        if (name === 'vr_no' && value.trim() === '') {
          setErrors((prevErrors) => ({
            ...prevErrors,
            vr_no: 'VR No is required.',
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            vr_no: '', // Reset the error if the value is not empty
          }));
        }

        if (name === 'vr_date') {
          const isValidDate = validateDate(value);
          if (!isValidDate) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              vr_date: 'Enter a valid date.',
            }));
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              vr_date: '', // Reset the error if the date is valid
            }));
          }
        }





    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateDate = (dateString) => {
    const currentDate = new Date();
    return currentDate;
  };
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
  
    return `${day}-${month}-${year}`;
  };

  const updateVrNoField = (value) => dispatch(updateVrNo(value));
  const updateVrDateField = (value) => dispatch(updateVrDate(value));
  const updateAcNameField = (value) => dispatch(updateAcName(value));
  const updateAcAmtField = (value) => dispatch(updateAcAmt(value));
  const updateStatusField = (value) => dispatch(updateStatus(value));

  const handleNew = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    setFormData({
      vr_no: '',
      vr_date: currentDate,
      ac_name: '',
      ac_amt: '',
      status: '',
    });
  
    dispatch(updateVrNo(''));
    dispatch(updateVrDate(currentDate));
    dispatch(updateAcName(''));
    dispatch(updateAcAmt(''));
    dispatch(updateStatus(''));
    dispatch(resetDetailTable())
  
   
  };
  const handleSave = async () => {
    try {
      // Save header data
      await axios.post('http://localhost:5000/api/save-header', formData);
  
      // Save detail table data
      await axios.post('http://localhost:5000/api/save-detail', detailTableState.rows);
  
      alert('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data. Please try again.');
    }
  };
  

  const handlePrint = () => {

    const { vr_no, vr_date, ac_name, ac_amt, status } = formData;

    const pdf = new jsPDF();
    pdf.text(`VR No: ${vr_no}`, 20, 20);
    pdf.text(`VR Date: ${vr_date}`, 20, 30);
    pdf.text(`Account Name: ${ac_name}`, 20, 40);
    pdf.text(`Account Amount: ${ac_amt}`, 20, 50);
    pdf.text(`Status: ${status}`, 20, 60);

    // Print detail table data
    const rows = detailTableState.rows;
    let yPosition = 70;
    rows.forEach((row, index) => {
      pdf.text(`${index + 1}. Item Code: ${row.itemCode}`, 20, yPosition);
      pdf.text(`   Item Name: ${row.itemName}`, 20, yPosition + 10);
      pdf.text(`   Quantities: ${row.quantities}`, 20, yPosition + 20);
      pdf.text(`   Prices: ${row.prices}`, 20, yPosition + 30);
      pdf.text(`   Total Sum Price: ${calculateTotalSumPrice(row)}`, 20, yPosition + 40);

      yPosition += 60; // Adjust the spacing
    });

    pdf.save('document.pdf');
  };

  const calculateTotalSumPrice = (row) => {
    const quantities = parseInt(row.quantities, 10) || 0;
    const prices = parseFloat(row.prices) || 0;
    return (quantities * prices).toFixed(2);
  };

  return (
    <div className="header-table-container">
      
      <div className="header-row">
        <div className="label-input-container">
          <label htmlFor="vr_no" className="label">VR No:</label>
          <span className="error-message">{errors.vr_no}</span>
          <input
            type="number"
            min={0} max={999999999999999999n}
            id="vr_no"
            name="vr_no"
            value={formData.vr_no}
            onChange={(e) => {
              handleChange(e);
              updateVrNoField(e.target.value);
            }}
            className="input"
          />
        </div>
        <div className="label-input-container">
  <label htmlFor="vr_date" className="label">VR Date:</label>
  <span className="error-message">{errors.vr_date}</span>
  <input
    type="text"
    id="vr_date"
    name="vr_date"
    value={getCurrentDate()}
    className="input"
    readOnly
  />
</div>

        <div className="label-input-container large">
          <label htmlFor="ac_name" className="label">Account Name:</label>
          <input
            type="text"
            id="ac_name"
            name="ac_name"
            value={formData.ac_name}
            onChange={(e) => {
              handleChange(e);
              updateAcNameField(e.target.value);
            }}
            className="input"
          />
        </div>
      </div>
      <div className="header-row">
        <div className="label-input-container">
          <label htmlFor="ac_amt" className="label">Account Amount:</label>
          <input
            type="number"
            id="ac_amt"
            name="ac_amt"
            value={formData.ac_amt}
            onChange={(e) => {
              handleChange(e);
              updateAcAmtField(e.target.value);
            }}
            className="input" readOnly
          />
        </div>
        <div className="label-input-container">
          <label htmlFor="status" className="label">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={(e) => {
              handleChange(e);
            }}
            className="input"
          >
            <option value="A">Active</option>
            <option value="I">Inactive</option>
          </select>
        </div>
      </div>
      <div className="button-container">
        <button onClick={handleNew}>New</button>
        <button onClick={handleSave}>Save</button>
        <button onClick={handlePrint}>Print</button>
      </div>
    </div>
  );
};

export default HeaderTable;
