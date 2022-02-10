import { FC } from "react";
import { CardMedia } from "@mui/material";
import CustomCarousel from "components/atoms/CustomCarousel";
import styled from "styled-components";
import Image from "next/image";

const ImageWrapper = styled.div`
  max-height: 500px;
  min-height: 400px;
  height: 100%;
  width: 100%;
  background-color: #e9e9e9;
  position: relative;
  & span {
    height: inherit !important;
  }
`

const FeedImages: FC<{images: string[]}> = ({ images }) => {
  return (
    <>
      {images[0] && (
        <CardMedia>
          <CustomCarousel>
            {images.map((img, i) => (
              <ImageWrapper key={i}>
                <Image
                  src={img} alt="image" 
                  layout="fill"
                  objectFit="contain"
                />
              </ImageWrapper>
            ))}
          </CustomCarousel>
        </CardMedia>
      )}
    </>
  )
}

export default FeedImages