"use client";
import ReactJson from "react-json-view";

export default function JsonViewComponent({ data }: { data: any }) {
  return <ReactJson src={data} />;
}
