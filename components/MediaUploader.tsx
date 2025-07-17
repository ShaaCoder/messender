// components/MediaUploader.tsx
"use client";
import React, { useState } from "react";

interface Props {
  onMediaLink: (link: string) => void;
}

export default function MediaUploader({ onMediaLink }: Props) {
  const [link, setLink] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLink(value);
    onMediaLink(value);
  };

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-2">
        Add Public Image/PDF Link (Optional)
      </label>
      <input
        type="url"
        className="w-full border p-2 rounded"
        placeholder="https://drive.google.com/..."
        value={link}
        onChange={handleChange}
      />
      <p className="text-sm text-gray-500 mt-1">
        Upload to Google Drive / Dropbox / Imgur, then paste public link.
      </p>
    </div>
  );
}
