import { CheckCircle2, UploadIcon , ImageIcon} from 'lucide-react';
import React, {useState} from 'react'
import { useOutletContext } from 'react-router';
import { PROGRESS_STEP, PROGRESS_INTERVAL_MS, REDIRECT_DELAY_MS } from '../Lib/constants';

interface UploadProps {
  onComplete: (data: string) => void;
}

const Upload: React.FC<UploadProps> = ({ onComplete }) => {
    const [file, setFile]= useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [progress, setProgress] = useState(0);

    const { isSignedIn } = useOutletContext<AuthContext>();

    const processFile = (selectedFile: File) => {
        if (!isSignedIn) return;
        setFile(selectedFile);
        setProgress(0);
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result as string;
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => onComplete(base64), REDIRECT_DELAY_MS);
                        return 100;
                    }
                    return prev + PROGRESS_STEP;
                });
            }, PROGRESS_INTERVAL_MS);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (!isSignedIn) return;
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            processFile(files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isSignedIn) return;
        const files = e.target.files;
        if (files && files.length > 0) {
            processFile(files[0]);
        }
    };

  return (
    <div className="upload">
      {!file ? (
        <div 
          className={`dropzone ${isDragging ? 'is-dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
            <input 
              type="file" 
              className="drop-input"
              accept=".jpg,.jpeg,.png" 
              disabled={!isSignedIn}
              onChange={handleFileChange}
            />
            <div className="drop-content">
                <div className="drop-icon">
                        <UploadIcon size={20} />
                </div>
                <p>
                    {isSignedIn ? (
                        "Click to Upload or Drag and Drop your floor plan here"
                    ) : (
                        "Please sign in to upload your floor plan"
                    )}
                </p>
                <p className="help">Maximum file size 50MB.</p>
                </div>
                </div>
      ) : (
        <div className="upload-status">
          <div className="status-content">
            <div className="status-icon">
                {progress === 100 ? (
                    <CheckCircle2 className="check" />
                ) : (
                    <ImageIcon className="image" />
                )}
            </div>
            <h3>{file.name}</h3>
            <div className="progress">
                <div className="bar" style={{ width: `${progress}%`}} />
                <p className= "Status-text">
                     {progress < 100 ? 'Analyzing Floor Plan ..' : 'Redirecting ...'} </p>
                </div>

            </div>
        </div>
      )}    
    </div>
  )
}

export default Upload