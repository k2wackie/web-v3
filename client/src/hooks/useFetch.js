import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";

const useFetch = (url, chk) => {
  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, [data.length]);

  return data;
};

export default useFetch;
