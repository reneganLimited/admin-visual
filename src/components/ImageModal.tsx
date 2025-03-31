import React, { useState, useCallback } from 'react';
import { FaSearchPlus, FaSearchMinus, FaUndo, FaRedo, FaTimes } from 'react-icons/fa';

interface ImageModalProps {
  image: { url: string; label: string };
  onClose: () => void;
  initialScale: number;
  initialRotation: number;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose, initialScale, initialRotation }) => {
  const [scale, setScale] = useState(initialScale);
  const [rotation, setRotation] = useState(initialRotation);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const newX = e.clientX - startPos.x;
      const newY = e.clientY - startPos.y;
      setPosition({ x: newX, y: newY });
    }
  }, [isDragging, startPos]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  }, [position]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const zoomIn = useCallback(() => {
    setScale(prev => Math.min(prev + 0.5, 8));
  }, []);

  const zoomOut = useCallback(() => {
    setScale(prev => Math.max(prev - 0.5, 1));
  }, []);

  const resetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const rotateImage = useCallback(() => {
    setRotation(prev => (prev + 90) % 360);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative w-full h-full" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
        <div
          className="absolute inset-0 cursor-move"
          onMouseDown={handleMouseDown}
        >
          <img
            src={image.url}
            alt={image.label}
            className="w-full h-full object-contain transition-transform duration-200 ease-in-out"
            style={{
              transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px) rotate(${rotation}deg)`,
              transformOrigin: 'center',
            }}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
          <div className="flex justify-center items-center space-x-4">
            <button onClick={zoomOut} className="p-2" title="Zoom Out">
              <FaSearchMinus />
            </button>
            <div className="text-center">
              {Math.round(scale * 100)}%
            </div>
            <button onClick={zoomIn} className="p-2" title="Zoom In">
              <FaSearchPlus />
            </button>
            <button onClick={rotateImage} className="p-2" title="Rotate Image">
              <FaRedo />
            </button>
          </div>
          <div className="text-center mt-2">
            {image.label}
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white p-2"
          title="Close"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default ImageModal;