// hooks/usePricingData.js

import { useEffect, useState } from 'react';
import axios from 'axios';

const usePricingData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3333/allProgramme');
        setData(response.data); // Assuming response.data contains the array of programs
        console.log(response.data);
      } catch (err: any) {
        setError(err); // Set error if fetch fails
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchPrograms();
  }, []); // Empty dependency array to run only once on mount

  return { data, loading, error };
};

export default usePricingData;
