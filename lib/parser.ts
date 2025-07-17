// lib/parser.ts
import * as XLSX from "xlsx";

export interface SheetRow {
  [key: string]: string | number | undefined;
  Name?: string;
  Phone?: string | number;
}

export function parseExcel(file: File): Promise<SheetRow[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json<SheetRow>(worksheet);
      resolve(jsonData);
    };
    reader.onerror = reject;
    reader.readAsBinaryString(file);
  });
}
