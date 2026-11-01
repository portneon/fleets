'use client';

import React, { useRef, useState } from 'react';
import { UploadCloud, CheckCircle2, FileText, X } from 'lucide-react';

interface FileUploadCardProps {
  label: string;
  sublabel?: string;
  accept?: string;
  uploadedUrl?: string;
  onFileSelect?: (url: string) => void;
  required?: boolean;
}

export const FileUploadCard: React.FC<FileUploadCardProps> = ({
  label,
  sublabel = 'PNG, JPG or PDF up to 5MB',
  uploadedUrl,
  onFileSelect,
  required = false,
}) => {
  const [fileName, setFileName] = useState<string | null>(
    uploadedUrl ? 'Uploaded_Document.pdf' : null
  );
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate realistic upload latency
      setTimeout(() => {
        setFileName(file.name);
        setIsUploading(false);
        onFileSelect?.(URL.createObjectURL(file));
      }, 700);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFileName(null);
    onFileSelect?.('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-semibold uppercase tracking-wider text-[#6E707A]">
        {label} {required && <span className="text-[#C84C4C]">*</span>}
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center p-5 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-150 ${
          fileName
            ? 'border-[#23845B] bg-[#F2FBF6]'
            : 'border-[#E7E8E4] bg-[#FBFCFA] hover:bg-[#F6F7F5] hover:border-[#D1D3CA]'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-2 py-2">
            <div className="w-6 h-6 border-2 border-[#362F4F] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-medium text-[#6E707A]">Uploading document...</p>
          </div>
        ) : fileName ? (
          <div className="flex items-center justify-between w-full px-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#DCFCE7] text-[#23845B]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-[#20212A] truncate max-w-[200px]">
                  {fileName}
                </p>
                <p className="text-xs text-[#23845B] font-medium">Ready for verification</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 text-[#92949C] hover:text-[#C84C4C] rounded-lg hover:bg-white transition-colors"
              title="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center gap-2 py-1">
            <div className="p-2.5 rounded-full bg-[#F0EEF5] text-[#362F4F]">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#20212A]">
                Click or drag file to upload
              </p>
              <p className="text-[11px] text-[#92949C] mt-0.5">{sublabel}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

