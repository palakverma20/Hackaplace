import React, { createContext, useContext, useState, useEffect } from 'react';

const BookmarkContext = createContext();

export const useBookmarks = () => {
    return useContext(BookmarkContext);
};

export const BookmarkProvider = ({ children }) => {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('hackaplace_bookmarks');
        if (saved) {
            try {
                setBookmarks(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse bookmarks", e);
            }
        }
    }, []);

    const isBookmarked = (id, type) => {
        if (type) {
            return bookmarks.some(b => b.id === id && b.type === type);
        }
        return bookmarks.some(b => b.id === id);
    };

    const toggleBookmark = (hackathon) => {
        setBookmarks(prev => {
            let updated;
            // Determine type of the incoming hackathon
            const type = hackathon.type || 'external'; 
            
            // Check existence using ID AND Type
            const exists = prev.some(b => b.id === hackathon.id && (b.type === type));

            if (exists) {
                updated = prev.filter(b => !(b.id === hackathon.id && b.type === type));
            } else {
                const newBookmark = { ...hackathon, type };
                updated = [...prev, newBookmark];
            }
            localStorage.setItem('hackaplace_bookmarks', JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
            {children}
        </BookmarkContext.Provider>
    );
};
