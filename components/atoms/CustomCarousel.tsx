import { FC } from "react";
import Carousel from "react-material-ui-carousel";

type CustomCarouselProps = {
  [key: string]: any
}

const CustomCarousel: FC<CustomCarouselProps> = ({ children, ...props }) => {
  return (
    <Carousel
      autoPlay={false}
      fullHeightHover={false}
      navButtonsProps={{
        style: {
          backgroundColor: "#001487",
          borderRadius: 10,
        },
      }}
      indicatorContainerProps={{
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 10,
        }
      }}
      indicatorIconButtonProps={{
        style: {
          color: '#6373cf',
        }
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: '#001487',
        }
      }}
      {...props}
    >
      {children}
    </Carousel>
  );
};

export default CustomCarousel;
