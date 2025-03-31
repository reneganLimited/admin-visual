import React, { useState, useRef, useCallback } from 'react';
import { FaSearchPlus, FaSearchMinus, FaExpandArrowsAlt } from 'react-icons/fa';
import ImageModal from './ImageModal';

interface InteractiveImageViewerProps {
  images: { 
    url: string; 
    label: string;
    dateUpdated?: string;
  }[];
}

const InteractiveImageViewer: React.FC<InteractiveImageViewerProps> = ({ images }) => {
  const [scales, setScales] = useState<number[]>(images.map(() => 1));
  const [rotations, setRotations] = useState<number[]>(images.map(() => 0));
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  const zoomIn = useCallback((index: number) => {
    setScales(prev => {
      const newScales = [...prev];
      newScales[index] = Math.min(newScales[index] + 0.5, 8);
      return newScales;
    });
  }, []);

  const zoomOut = useCallback((index: number) => {
    setScales(prev => {
      const newScales = [...prev];
      newScales[index] = Math.max(newScales[index] - 0.5, 1);
      return newScales;
    });
  }, []);

  const resetZoom = useCallback((index: number) => {
    setScales(prev => {
      const newScales = [...prev];
      newScales[index] = 1;
      return newScales;
    });
  }, []);

  const rotateImage = useCallback((index: number) => {
    setRotations(prev => {
      const newRotations = [...prev];
      newRotations[index] = (newRotations[index] + 90) % 360;
      return newRotations;
    });
  }, []);

  const openModal = useCallback((index: number) => {
    setSelectedImageIndex(index);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setSelectedImageIndex(null);
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-full">
            <div className="relative w-full h-full overflow-hidden">
              <img
                ref={(el) => (imageRefs.current[index] = el)}
                src={image.url}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-contain transition-transform duration-200 ease-in-out"
                style={{
                  transform: `scale(${scales[index]}) rotate(${rotations[index]}deg)`,
                  transformOrigin: 'center',
                }}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <div className="flex justify-center items-center space-x-4">
                <button onClick={() => zoomOut(index)} className="p-2" title="Zoom Out">
                  <FaSearchMinus />
                </button>
                <div className="text-center">
                  {Math.round(scales[index] * 100)}%
                </div>
                <button onClick={() => zoomIn(index)} className="p-2" title="Zoom In">
                  <FaSearchPlus />
                </button>
                <button onClick={() => openModal(index)} className="p-2" title="Expand Image">
                  <FaExpandArrowsAlt />
                </button>
              </div>
              <div className="text-center mt-2">
                {image.label}
                {image.dateUpdated && (
                  <div className="text-sm text-gray-300">
                    {new Date(image.dateUpdated).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {modalOpen && selectedImageIndex !== null && (
        <ImageModal
          image={images[selectedImageIndex]}
          onClose={closeModal}
          initialScale={scales[selectedImageIndex]}
          initialRotation={rotations[selectedImageIndex]}
        />
      )}
    </>
  );
};

export default InteractiveImageViewer;
