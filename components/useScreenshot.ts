import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

export const useScreenshot = (blockId: number) => {
  const { gl } = useThree();

  const takeScreenshot = () => {
    gl.domElement.toBlob((blob) => {
      if (!blob) {
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.download = `introspection_block_${blockId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 'image/png');
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'p' || event.key === 'P') {
        takeScreenshot();
      }
    };

    window.addEventListener('keyup', handleKeyPress);

    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    };
  }, [gl]);
};
