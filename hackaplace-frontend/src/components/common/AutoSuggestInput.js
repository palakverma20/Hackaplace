import React, { useState, useEffect, useRef } from 'react';
import './AutoSuggestInput.css';

const AutoSuggestInput = ({ 
  label, 
  value, 
  onChange, 
  suggestions, 
  placeholder,
  name,
  required = false 
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Close suggestions when clicking outside
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleChange = (e) => {
    const userInput = e.target.value;
    
    // Filter suggestions that contain the user's input
    const unLinked = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    onChange(e); // Propagate change to parent
    setFilteredSuggestions(unLinked);
    setShowSuggestions(true);
    setActiveSuggestionIndex(0);
  };

  const handleClick = (e) => {
    // Determine the clicked value (handle both direct clicks and child element clicks)
    const innerText = e.target.innerText;
    
    // Create a synthetic event or just call onChange with the new value
    // Here we'll manually trigger the parent's onChange if needed, 
    // but typically we just update the specific field value directly via a custom handler logic
    // or by creating a synthetic event.
    
    // Simulating the event object expected by handleChange/parent
    const syntheticEvent = {
        target: {
            name: name,
            value: innerText
        }
    };
    
    onChange(syntheticEvent);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    // Enter key
    if (e.keyCode === 13) {
      e.preventDefault();
      // Only select if suggestions are visible and there's a match
      if (showSuggestions && filteredSuggestions[activeSuggestionIndex]) {
        const selectedValue = filteredSuggestions[activeSuggestionIndex];
        const syntheticEvent = {
            target: {
                name: name,
                value: selectedValue
            }
        };
        onChange(syntheticEvent);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
      }
    }
    // Up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestionIndex === 0) {
        return;
      }
      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    }
    // Down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    }
  };

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul className="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            className = "suggestion-active";
          }
          return (
            <li className={className} key={suggestion} onClick={handleClick}>
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : (
      // Optional: Show "No suggestions" message
      // <div className="no-suggestions">
      //   <em>No suggestions, you're on your own!</em>
      // </div>
      null
    );
  };

  return (
    <div className="autosuggest-wrapper" ref={wrapperRef}>
      {label && <label className="autosuggest-label">{label}</label>}
      <input
        type="text"
        name={name}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        placeholder={placeholder}
        required={required}
        autoComplete="off"
        className="autosuggest-input"
        onFocus={() => {
            if(value && filteredSuggestions.length === 0) {
                 // optionally re-trigger search or just show nothing
            }
        }}
      />
      {showSuggestions && value && <SuggestionsListComponent />}
    </div>
  );
};

export default AutoSuggestInput;
