import React, { useState } from 'react';
import axios from 'axios';
import '.././index.css';

const TechnicianDashboard = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    scanType: 'Intraoral',
    region: 'Hyderabab',
  });
  const [scanImage, setScanImage] = useState(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setScanImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!scanImage) {
      setMessage('Please select an image file to upload.');
      return;
    }
    
    setIsSubmitting(true);
    setMessage('Uploading...');

    const data = new FormData();
    data.append('patientName', formData.patientName);
    data.append('patientId', formData.patientId);
    data.append('scanType', formData.scanType);
    data.append('region', formData.region);
    data.append('scanImage', scanImage);
    
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_API_URL}/api/scans/upload`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      setMessage('✅ Scan uploaded successfully!');
      // Reset form
      e.target.reset();
      setScanImage(null);
    } catch (error) {
      setMessage('❌ Upload failed. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='tech-cont'>
      <h2 className="page-title">Technician Dashboard: Upload Scan</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: 'white' }}>Patient Name:</label>
          <input type="text" name="patientName" onChange={handleChange} required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: 'white' }}>Patient ID:</label>
          <input type="text" name="patientId" onChange={handleChange} required style={{ width: '100%' }}/>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: 'white' }}>Scan Type:</label>
          <select name="scanType" onChange={handleChange} value={formData.scanType} style={{ width: '100%' }}>
            <option>Intraoral</option>
            <option>Extraoral</option>
          </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: 'white' }}>Region:</label>
          <select name="region" onChange={handleChange} value={formData.region} style={{ width: '100%' }}>
            <option>Hyderabad</option>
            <option>Vizay</option>
            <option>Bengaluru</option>
          </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: 'white' }}>Scan Image (JPEG, PNG):</label>
          <input type="file" name="scanImage" onChange={handleFileChange} accept="image/jpeg, image/png" required style={{ width: '100%', color: 'white' }}/>
        </div>
        <button type="submit" className="button" disabled={isSubmitting}>{isSubmitting ? 'Uploading...' : 'Upload Scan'}</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TechnicianDashboard;