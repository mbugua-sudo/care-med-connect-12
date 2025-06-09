
import { useState } from 'react';
import { BlurhashCanvas } from 'react-blurhash';

interface BlurImageProps {
  src: string;
  alt: string;
  className?: string;
  blurhash?: string;
}

export const BlurImage = ({ 
  src, 
  alt, 
  className = "", 
  blurhash = "LKO2?U%2Tw=w]~RBVZRi};RPxuwH" // Default blurhash
}: BlurImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!imageLoaded && !imageError && (
        <BlurhashCanvas
          hash={blurhash}
          width="100%"
          height="100%"
          className="absolute inset-0 w-full h-full"
        />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
    </div>
  );
};
