import {useState, useEffect} from "react";

const usePostcodes = () => {
  const [postcodes, setPostcodes] = useState(null as any);

  useEffect(() => {
    const fetchData = async () => {
      const postcodePath = await import('../data/postcodes.zip');
      const postcodeResponse = await fetch(postcodePath.default);
      const data = await postcodeResponse.blob();
      setPostcodes(data)
    }
    fetchData()
  }, [])

  return postcodes
}

export default usePostcodes;