import React from 'react';
import AutoSuggestInput from '../../common/AutoSuggestInput';
import { colleges, cities, countries } from '../../../data/autoSuggestData';

const ParticipantDetailsForm = ({ data, onUpdate, onNext }) => {
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation check
    const requiredFields = ['fullName', 'email', 'contact', 'college', 'degree', 'branch', 'gradYear', 'city', 'country'];
    const isValid = requiredFields.every(field => data[field] && data[field].trim() !== '');

    if (isValid) {
      onNext();
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="participant-details-form">
      <h3>Personal Details</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="fullName" className="form-input" value={data.fullName || ''} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" className="form-input" value={data.email || ''} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <div className="form-group half">
            <label>Contact Number</label>
            <input type="tel" name="contact" className="form-input" value={data.contact || ''} onChange={handleChange} required />
          </div>
          <div className="form-group half">
            <label>Alt. Contact (Optional)</label>
            <input type="tel" name="altContact" className="form-input" value={data.altContact || ''} onChange={handleChange} />
          </div>
        </div>

        <h3>Education</h3>
        <AutoSuggestInput
          label="College / University"
          name="college"
          value={data.college || ''}
          onChange={handleChange}
          suggestions={colleges}
          placeholder="Start typing your college name..."
          required={true}
        />
        
        <div className="form-row">
            <div className="form-group half">
                <AutoSuggestInput label="City" name="eduCity" value={data.eduCity || ''} onChange={handleChange} suggestions={cities} required={true} />
            </div>
            <div className="form-group half">
                <AutoSuggestInput label="Country" name="eduCountry" value={data.eduCountry || ''} onChange={handleChange} suggestions={countries} required={true} />
            </div>
        </div>

        <div className="form-row">
          <div className="form-group third">
            <label>Degree</label>
            <input type="text" name="degree" className="form-input" value={data.degree || ''} onChange={handleChange} placeholder="e.g. B.Tech" required />
          </div>
          <div className="form-group third">
            <label>Branch</label>
            <input type="text" name="branch" className="form-input" value={data.branch || ''} onChange={handleChange} placeholder="e.g. CSE" required />
          </div>
          <div className="form-group third">
            <label>Year</label>
            <input type="text" name="gradYear" className="form-input" value={data.gradYear || ''} onChange={handleChange} placeholder="e.g. 2026" required />
          </div>
        </div>

        <h3>Current Location</h3>
        <div className="form-row">
           <div className="form-group third">
             <AutoSuggestInput label="City" name="city" value={data.city || ''} onChange={handleChange} suggestions={cities} required={true} />
           </div>
           <div className="form-group third">
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>State</label>
              <input type="text" name="state" className="form-input" value={data.state || ''} onChange={handleChange} style={{ width: '100%' }} />
           </div>
           <div className="form-group third">
             <AutoSuggestInput label="Country" name="country" value={data.country || ''} onChange={handleChange} suggestions={countries} required={true} />
           </div>
        </div>

        <button type="submit" className="btn-primary" style={{marginTop: '20px', width: '100%'}}>Next: Participation Preference</button>

        <style jsx>{`
            .participant-details-form { text-align: left; }
            .form-group { margin-bottom: 15px; }
            .form-group label { display: block; margin-bottom: 5px; font-weight: 600; font-size: 0.95rem; }
            .form-input { 
                width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; font-size: 1rem;
            }
            .form-row { display: flex; gap: 15px; }
            .form-row .half { flex: 1; }
            .form-row .third { flex: 1; }
            h3 { margin-top: 25px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px; color: #2d3748; }
        `}</style>
      </form>
    </div>
  );
};

export default ParticipantDetailsForm;
