import React from "react";
import LightGallery, { LightGalleryProps } from "lightgallery/react";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgAutoplay from "lightgallery/plugins/autoplay";

interface CFGalleryProps extends LightGalleryProps {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
}

export const CFGallery = React.forwardRef<HTMLDivElement, CFGalleryProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div className="App" ref={ref}>
        <LightGallery
          speed={500}
          hideBarsDelay={5000}
          plugins={[lgThumbnail, lgZoom, lgFullscreen, lgAutoplay]}
          selector="a.light-gallery"
          licenseKey="68FE79DA-DD0D-4845-8E89-3DBF1CD4E321"
          elementClassNames={`${className}`}
          {...props}
        >
          {children}
        </LightGallery>
      </div>
    );
  }
);
