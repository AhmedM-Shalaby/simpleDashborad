import axios from "axios"
import { useEffect, useState } from "react";

const useGetData = (url) => {
  const [data, setData] = useState([])
  const [isLoad, setIsLoad] = useState(true)
  const [error, setError] = useState({ Found: false })
  useEffect(() => {
    axios({ method: 'get', url: url, }).then(function (response) {
      setData(response.data)
      setIsLoad(false)
    }).catch(function (error) {
      if (error.response) {
        setError({
          code: error.code,
          Found: true,
          status: error.response.status
          , statusText: error.response.statusText
        })
      }
    })
  }, [url])
  return [data, isLoad, error, setData]
}

export default useGetData
