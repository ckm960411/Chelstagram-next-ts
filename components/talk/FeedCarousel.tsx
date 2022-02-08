import { FC } from "react";
import Carousel from "react-material-ui-carousel";

const FeedCarousel: FC = ({ children }) => {
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
    >
      {children}
    </Carousel>
  );
};

export default FeedCarousel;
