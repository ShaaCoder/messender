// components/MessagePreview.tsx
"use client";
import React from "react";

interface Props {
  data: any[];
  template: string;
  mediaLink: string;
}

export default function MessagePreview({ data, template, mediaLink }: Props) {
  const buildMessage = (row: any) => {
    let msg = template.replace(/\{\{(.*?)\}\}/g, (_, key) => row[key.trim()] || "");
    if (mediaLink) msg += `\n\n🔗 File: ${mediaLink}`;
    return msg;
  };

  /* 🔑 NEW – sends every link with 2‑second spacing */
  const handleSendAll = () => {
    if (!data.length) return;
    data.forEach((row, i) => {
      const msg   = buildMessage(row);
      const phone = row.Phone?.toString().replace(/\D/g, "");
      const url   = `https://wa.me/91${phone}?text=${encodeURIComponent(msg)}`;
      setTimeout(() => {
        window.open(url, "_blank");          // may need pop‑up permission
      }, i * 2000);                          // 2 000 ms delay between opens
    });
  };

  return (
    <>
      {/* ✅ “Send All” button */}
      <button
        onClick={handleSendAll}
        className="mb-2 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        Send All
      </button>

      <div className="overflow-x-auto">
        <table className="table-auto border w-full text-sm">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Message</th>
              <th className="border p-2">Send</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => {
              const msg   = buildMessage(row);
              const phone = row.Phone?.toString().replace(/\D/g, "");
              const url   = `https://wa.me/91${phone}?text=${encodeURIComponent(msg)}`;
              return (
                <tr key={i}>
                  <td className="border p-2">{row.Name}</td>
                  <td className="border p-2">{phone}</td>
                  <td className="border p-2 whitespace-pre-wrap">{msg}</td>
                  <td className="border p-2">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Send
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
