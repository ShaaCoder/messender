// components/FileUploader.tsx
"use client";
import { parseExcel } from "@/lib/parser";
import React from "react";

interface Props {
  onDataLoaded: (data: any[]) => void;
}

export default function FileUploader({ onDataLoaded }: Props) {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = await parseExcel(file);
    onDataLoaded(data);
  };

  return (
    <input
      type="file"
      accept=".xlsx, .xls"
      onChange={handleChange}
      className="p-2 border"
    />
  );
}
