import React, { useState, useEffect } from 'react';
import NavbarComan from '../../Component/NavbarComan';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

const DreamPage = () => {
  const [dreams, setDreams] = useState([]);
  const [selectedDream, setSelectedDream] = useState(null);

  const toggleDreamDetails = (dreamId) => {
    setSelectedDream(dreamId);
  };

  const fetchDreams = async () => {
    // try {
    //   const response = await axios.get('API_ENDPOINT'); // Replace with your API endpoint
    //   setDreams(response.data);
    // } catch (error) {
    //   console.error('Error fetching dreams:', error);
    // }
    const dreamData = [
        { id: 1, title: 'Dream 1', content: 'Dream 1 content', expanded: false },
        { id: 2, title: 'Dream 2', content: 'Dream 2 content', expanded: false },
        // ... other dream data
      ];
  
      setDreams(dreamData);
  };

  useEffect(() => {
    fetchDreams();
  }, []);

  const closeModal = () => {
    setSelectedDream(null);
  };

  return (
    <>
      <NavbarComan />
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">User Dreams</h1>
          {dreams.map((dream) => (
            <div
              key={dream.id}
              className="bg-white rounded shadow p-4 mb-4 cursor-pointer"
              onClick={() => toggleDreamDetails(dream.id)}
            >
              <p className="font-bold">{dream.title}</p>
              {selectedDream === dream.id && (
                <Modal show={true} onHide={closeModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>{dream.title}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>{dream.content}</p>
                  </Modal.Body>
                </Modal>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DreamPage;
