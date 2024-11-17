import { useState, useCallback } from 'react';
import { Slide, SlideImage, SlideVideo } from 'yet-another-react-lightbox';

// ----------------------------------------------------------------------

type ReturnType = {
  open: boolean;
  selected: number;
  onClose: VoidFunction;
  onOpen: (slideUrl: string) => void;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
};

export default function useLightBox(slides: Slide[]): ReturnType {
  const [selected, setSelected] = useState(-1);

  const handleOpen = useCallback(
    (slideUrl: string) => {
      const slideIndex = slides.findIndex((slide) =>
        slide.type === 'video'
          ? (slide as SlideVideo).poster === slideUrl
          : (slide as SlideImage).src === slideUrl
      );

      setSelected(slideIndex);
    },
    [slides]
  );

  const handleClose = useCallback(() => {
    setSelected(-1);
  }, []);

  return {
    selected,
    open: selected >= 0,
    onOpen: handleOpen,
    onClose: handleClose,
    setSelected,
  };
}
