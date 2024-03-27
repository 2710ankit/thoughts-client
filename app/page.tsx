"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import axiosInterceptorInstance from "./interceptor/interceptor.";
import TableStatic from "./static-components/table";

export default function Home() {
  const [thoughts, setThoughts] = useState([]);
  const [totalCount, settotalCount] = useState(0);

  useEffect(() => {
    axiosInterceptorInstance.get("thoughts/").then(
      (res) => {
        console.log(res.data);
        setThoughts(res.data.data);
        settotalCount(res.data.totalCount);
      },
      (err) => {}
    );
  }, []);

  const onQueryChange = (q) => {
    axiosInterceptorInstance
      .get("thoughts/search", {
        params: q,
      })
      .then(
        (res) => {
          console.log(res.data);
          setThoughts(res.data.data);
          settotalCount(res.data.totalCount);
        },
        (err) => {}
      );
  };

  return (
    <TableStatic
      thoughts={thoughts}
      totalCount={totalCount}
      onQueryChange={onQueryChange}
    ></TableStatic>
  );
}
