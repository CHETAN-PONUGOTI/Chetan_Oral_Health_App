import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const DentistDashboard = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/scans`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setScans(res.data);
      } catch (error) {
        setError("Failed to fetch scans. Please try again later.");
        console.error("Failed to fetch scans", error);
      } finally {
        setLoading(false);
      }
    };
    fetchScans();
  }, []);

  const downloadReport = (scan) => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text("Dental Scan Report", 105, 20, null, null, "center");
    
    doc.setFontSize(12);
    doc.text(`Patient Name: ${scan.patientName}`, 14, 40);
    doc.text(`Patient ID: ${scan.patientId}`, 14, 50);
    doc.text(`Scan Type: ${scan.scanType}`, 14, 60);
    doc.text(`Region: ${scan.region}`, 14, 70);
    doc.text(`Upload Date: ${new Date(scan.uploadDate).toLocaleString()}`, 14, 80);

    // Note: Cloudinary URLs generally work well with jsPDF's addImage.
    // If you encounter CORS issues, you may need to configure your Cloudinary account's security settings.
    doc.addImage(scan.imageUrl, 'JPEG', 15, 90, 180, 160);
    
    doc.save(`Report-${scan.patientId}-${scan.patientName}.pdf`);
  };

  if (loading) return <p>Loading scans...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="dentist-cont">
      <h2 className="page-title">Dentist Dashboard: Scan Viewer</h2>
      <div className="dashboard-grid">
        {scans.length > 0 ? scans.map(scan => (
          <div key={scan.id} className="card scan-card">
            <img src={scan.imageUrl} alt={`Scan for ${scan.patientName}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div className="scan-card-content">
              <h4>{scan.patientName} (ID: {scan.patientId})</h4>
              <p><strong>Type:</strong> {scan.scanType} | <strong>Region:</strong> {scan.region}</p>
              <p><strong>Uploaded:</strong> {new Date(scan.uploadDate).toLocaleDateString()}</p>
            </div>
            <div className="scan-card-actions">
                <button onClick={() => window.open(scan.imageUrl, '_blank')} style={{ marginRight: '10px' }}>View Full Image</button>
                <button onClick={() => downloadReport(scan)}>Download Report</button>
            </div>
          </div>
        )) : <p>No scans have been uploaded yet.</p>}
      </div>
    </div>
  );
};

export default DentistDashboard;