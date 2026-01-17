import { useState, useEffect } from "react";
import { fetchExternalHackathons } from "../services/aiHackathonService";
import { useNavigate } from "react-router-dom";
import { useBookmarks } from "../context/BookmarkContext";
import "./ExternalHackathons.css";

function ExternalHackathons() {
  const navigate = useNavigate();
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHackathon, setSelectedHackathon] = useState(null);

  // --- New State for Search & Filters ---
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modeFilter, setModeFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState("All");
  
  // --- New State for Features ---
  const [showBookmarked, setShowBookmarked] = useState(false);
  
  // Use Context
  const { isBookmarked, toggleBookmark } = useBookmarks();

  useEffect(() => {
    fetchExternalHackathons().then((data) => {
      setHackathons(data);
      setLoading(false);
    });
  }, []);

  // --- Helper: Get next 6 months for filter ---
  const getNext6Months = () => {
      const months = [];
      const today = new Date();
      for (let i = 0; i < 6; i++) {
          const d = new Date(today.getFullYear(), today.getMonth() + i, 1);
          months.push({ 
              label: d.toLocaleString('default', { month: 'long', year: 'numeric' }), 
              key: i, // simple offset key
              value: d.getMonth()
          });
      }
      return months;
  };
  const monthOptions = getNext6Months();

   const setReminder = (hackathon, e) => {
      e.stopPropagation();
      alert(`Reminder set for ${hackathon.name}! We will notify you 24h before the deadline.`);
  };

  const getGroupedHackathons = () => {
    // 1. Filter
    const filteredList = hackathons.filter(h => {
        const q = searchQuery.toLowerCase();
        const matchesSearch = h.name.toLowerCase().includes(q) || 
                              h.about.toLowerCase().includes(q) ||
                              (h.questions && h.questions.toLowerCase().includes(q));
        
        const matchesStatus = statusFilter === "All" || h.status === statusFilter;
        const matchesMode = modeFilter === "All" || h.mode === modeFilter;
        
        // Update: Use context check
        const matchesBookmark = !showBookmarked || isBookmarked(h.id, 'external');

        return matchesSearch && matchesStatus && matchesMode && matchesBookmark;
    });

    // 2. Group by Month (Simplified for Demo: just grouping everything into "Upcoming" vs "Ongoing" buckets effectively, 
    // or actually implementing month buckets if we had real dates. For now, let's just respect the Month Filter if selected, else show all.)
    
    // For this specific UI, let's keep the design simple:
    // If Month Filter is "All", show lists by Month.
    // If Month Filter is specific, show only that month.
    
    let displayMonths = monthOptions;
    if (monthFilter !== "All") {
        const selectedIndex = parseInt(monthFilter);
        displayMonths = monthOptions.filter(m => m.key === selectedIndex);
    }

    return displayMonths.map(m => {
        // Mock logic to assign events to months pseudo-randomly for demo if date is not strict
        // In real app, check `new Date(h.startDate).getMonth() === m.value`
        
        // Let's just dump all filtered events into the FIRST available month for the demo to ensure they appear
        // Or if we want to be smarter, we parse h.startDate.
        
        const eventsInMonth = filteredList.filter(h => {
            const d = new Date(h.startDate);
            // Check if year/month matches the month option
            // (Note: monthOptions generates forward looking months)
            // Simplified: Just match month index for now
            return d.getMonth() === m.value;
        });

        // Sort by date inside the month
        return {
            monthLabel: m.label,
            events: eventsInMonth.sort((a,b) => new Date(a.startDate) - new Date(b.startDate))
        };
    }).filter(group => group.events.length > 0);
  };

  const groupedData = getGroupedHackathons();

  // Updated toggle handler wrapper
  const handleToggle = (h, e) => {
      e.stopPropagation();
      // Ensure type is explicit
      toggleBookmark({ ...h, type: 'external' });
  };

  return (
    <div className="hackathon-container">
      {/* Header Section */}
      <div className="hack-header">
        <h1>Global Hackathons 🌍</h1>
        <p>Discover AI-curated hackathons from Devpost, MLH, and more.</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="filter-bar">
          <input 
            type="text" 
            placeholder="Search hackathons, topics..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
          </select>

          <select className="filter-select" value={modeFilter} onChange={(e) => setModeFilter(e.target.value)}>
              <option value="All">All Modes</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Hybrid">Hybrid</option>
          </select>

          <select className="filter-select" value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)}>
              <option value="All">All Months</option>
              {monthOptions.map(m => (
                  <option key={m.key} value={m.key}>{m.label}</option>
              ))}
          </select>

          <button 
            className={`filter-btn ${showBookmarked ? 'active' : ''}`}
            onClick={() => setShowBookmarked(!showBookmarked)}
            title="Show Bookmarked Only"
          >
             {showBookmarked ? '★ Bookmarked' : '☆ Bookmarked'}
          </button>
      </div>

      {loading ? (
        <div className="loading-state">
           <div className="spinner"></div>
           <p>Curating best hackathons for you...</p>
        </div>
      ) : (
        <div className="hackathon-list">
             {groupedData.length === 0 ? (
                 <div className="empty-state">
                     <h3>No hackathons found matching your filters.</h3>
                     <button className="clear-filter-btn" onClick={() => {
                         setSearchQuery("");
                         setStatusFilter("All");
                         setModeFilter("All");
                         setMonthFilter("All");
                         setShowBookmarked(false);
                     }}>Clear Filters</button>
                 </div>
             ) : (
                 groupedData.map((group, idx) => (
                     <div key={idx} className="month-group">
                         <h2 className="month-label">{group.monthLabel}</h2>
                         <div className="events-grid">
                             {group.events.map(h => {
                                 const bookmarked = isBookmarked(h.id, 'external');
                                 return (
                                 <div 
                                    key={h.id} 
                                    className={`hackathon-list-item ${bookmarked ? 'bookmarked-item' : ''}`}
                                    onClick={() => setSelectedHackathon(h)}
                                 >
                                     <div className="item-header">
                                         <span className={`status-badge ${h.status === 'Ongoing' ? 'badge-green' : 'badge-blue'}`}>
                                             {h.status}
                                         </span>
                                         <span className="mode-badge">{h.mode}</span>
                                     </div>
                                     
                                     <h3>{h.name}</h3>
                                     
                                     <div className="item-meta">
                                         <span>📅 {h.startDate}</span>
                                         <span> • </span>
                                         <span>⏳ Due: {h.deadline}</span>
                                     </div>

                                     <p className="item-desc">{h.about.substring(0, 80)}...</p>

                                     <div className="item-actions">
                                         <button 
                                            className="action-icon-btn"
                                            onClick={(e) => handleToggle(h, e)}
                                            title={bookmarked ? "Remove Bookmark" : "Bookmark"}
                                         >
                                             {bookmarked ? "★" : "☆"} 
                                         </button>
                                         <button 
                                            className="action-icon-btn" 
                                            onClick={(e) => setReminder(h, e)}
                                            title="Set Reminder"
                                         >
                                             🔔
                                         </button>
                                         <a href={h.link} target="_blank" rel="noreferrer" className="view-link" onClick={e => e.stopPropagation()}>
                                             View ↗
                                         </a>
                                     </div>
                                 </div>
                                 );
                             })}
                         </div>
                     </div>
                 ))
             )}
        </div>
      )}

      {/* Detail Modal */}
      {selectedHackathon && (
         <div className="modal-backdrop" onClick={() => setSelectedHackathon(null)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={() => setSelectedHackathon(null)}>×</button>
                
                <div className="modal-header">
                    <h2>{selectedHackathon.name}</h2>
                    <div className="modal-badges">
                        <span className="badge">{selectedHackathon.status}</span>
                        <span className="badge">{selectedHackathon.mode}</span>
                    </div>
                </div>

                <div className="modal-body">
                    <p className="modal-about">{selectedHackathon.about}</p>
                    
                    <div className="modal-info-grid">
                        <div className="info-item">
                            <label>Start Date</label>
                            <strong>{selectedHackathon.startDate}</strong>
                        </div>
                        <div className="info-item">
                            <label>Submission Deadline</label>
                            <strong>{selectedHackathon.deadline}</strong>
                        </div>
                        <div className="info-item">
                            <label>Problem Statements</label>
                            <p>{selectedHackathon.questions}</p>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button 
                        className="modal-action-btn secondary"
                        onClick={(e) => handleToggle(selectedHackathon, e)}
                    >
                        {isBookmarked(selectedHackathon.id) ? "★ Remove Bookmark" : "☆ Add Bookmark"}
                    </button>
                    <a href={selectedHackathon.link} target="_blank" rel="noreferrer" className="modal-action-btn primary">
                        Register on Platform ↗
                    </a>
                </div>
            </div>
         </div>
      )}
    </div>
  );
}

export default ExternalHackathons;
