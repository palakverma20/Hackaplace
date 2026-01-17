import React, { useState } from 'react';

const SubmissionSection = ({ submission, phase }) => {
  const [formData, setFormData] = useState({
      title: submission?.submittedData?.title || '',
      description: submission?.submittedData?.description || '',
      techStack: submission?.submittedData?.techStack || '',
      repoLink: submission?.submittedData?.repoLink || '',
      demoLink: submission?.submittedData?.demoLink || '',
      pptFileName: submission?.pptFileName || '',
      pptUrl: submission?.pptUrl || ''
  });
  const [isSubmitted, setIsSubmitted] = useState(submission.status === 'submitted');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        // In a real app, upload logic would happen here
        // For now, we simulate by setting the name and a dummy URL
        setFormData({
            ...formData,
            pptFileName: file.name,
            pptUrl: URL.createObjectURL(file) // Local preview
        });
    }
  };

  if (phase === 'Registration' || phase === 'TeamFormation') {
      return (
          <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem', background: '#f7fafc' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
              <h3 style={{ color: '#2d3748' }}>Submission Window Closed</h3>
              <p style={{ color: '#718096' }}>You can submit your project once the Submission phase begins.</p>
          </div>
      );
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      setIsSubmitted(true);
      // Logic would be here to persist data
  };

  if (isSubmitted) {
      return (
        <div className="card">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                 <div style={{ width: '60px', height: '60px', background: '#48bb78', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 1rem auto' }}>
                     ✓
                 </div>
                 <h2 style={{ color: '#2f855a' }}>Project Submitted!</h2>
                 <p>Your team's submission has been recorded.</p>
            </div>

            <div style={{ background: '#f0fff4', padding: '1.5rem', borderRadius: '8px', border: '1px solid #c6f6d5' }}>
                <div style={{ marginBottom: '1rem' }}><strong>Title:</strong> {formData.title || "Untitled Project"}</div>
                <div style={{ marginBottom: '1rem' }}><strong>Description:</strong> {formData.description || "No description provided."}</div>
                
                {formData.pptFileName && (
                    <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#e6fffa', borderRadius: '4px', borderLeft: '4px solid #38b2ac' }}>
                        <strong>Presentation:</strong> {formData.pptFileName}
                        <div style={{ marginTop: '0.25rem' }}>
                            <a href={formData.pptUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', color: '#319795' }}>View / Download PPT</a>
                        </div>
                    </div>
                )}

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <a href={formData.repoLink || '#'} target="_blank" rel="noopener noreferrer" style={{ color: '#48bb78', fontWeight: 'bold' }}>View Repository</a>
                    <a href={formData.demoLink || '#'} target="_blank" rel="noopener noreferrer" style={{ color: '#48bb78', fontWeight: 'bold' }}>Live Demo</a>
                </div>
            </div>
            
             <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <button className="btn-secondary" onClick={() => setIsSubmitted(false)}>Edit Submission</button>
             </div>
        </div>
      );
  }

  return (
    <div className="card">
        <h3 className="section-title">🚀 Project Submission</h3>
        <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Project Title</label>
                <input 
                    type="text" 
                    className="form-input" 
                    required 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Description</label>
                <textarea 
                    className="form-input" 
                    rows="4" 
                    required
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Tech Stack (comma separated)</label>
                <input 
                    type="text" 
                    className="form-input" 
                    placeholder="React, Node.js, Python..."
                    value={formData.techStack}
                    onChange={e => setFormData({...formData, techStack: e.target.value})}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                    <label className="form-label">GitHub Repository</label>
                    <input 
                        type="url" 
                        className="form-input" 
                        placeholder="https://github.com/..."
                        value={formData.repoLink}
                        onChange={e => setFormData({...formData, repoLink: e.target.value})}
                    />
                </div>
                <div>
                     <label className="form-label">Demo Video / Link</label>
                    <input 
                        type="url" 
                        className="form-input" 
                        placeholder="https://youtube.com/..."
                        value={formData.demoLink}
                        onChange={e => setFormData({...formData, demoLink: e.target.value})}
                    />
                </div>
            </div>

            <div style={{ marginBottom: '1.5rem', border: '1px dashed #cbd5e0', padding: '1.5rem', borderRadius: '8px', background: '#f8fafc' }}>
                <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Presentation / PPT Upload (Optional)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <input 
                        type="file" 
                        accept=".ppt,.pptx,.pdf"
                        onChange={handleFileChange}
                        className="form-input" 
                        style={{ border: 'none', padding: 0 }}
                    />
                    {formData.pptFileName && (
                        <span style={{ fontSize: '0.9rem', color: '#2b6cb0', fontWeight: 'bold' }}>
                            Selected: {formData.pptFileName}
                        </span>
                    )}
                </div>
                <p style={{ fontSize: '0.8rem', color: '#718096', marginTop: '0.5rem' }}>
                    Supported formats: .ppt, .pptx, .pdf. Maximum size: 10MB.
                </p>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>Submit Project</button>
        </form>
    </div>
  );
};

export default SubmissionSection;
