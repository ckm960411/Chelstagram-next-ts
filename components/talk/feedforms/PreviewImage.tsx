import { FC, useCallback } from "react";
import Image from "next/image";
import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";

const ImageWrapper = styled.div`
  height: 200px;
  width: 200px;
  background-color: #e9e9e9;
  border-radius: 20px 0 20px 0;
  position: relative;
  & span {
    height: inherit !important;
    width: inherit !important;
    position: relative !important;
  }
  & > button {
    position: absolute;
    top: 0;
    right: 0;
  }
  & > div {
    position: absolute;
    bottom: 0; left: 0;
    width: 30px;
    height: 30px;
    background-color: #001487;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
  }
`

const PreviewImage: FC<PreviewImageProps> = ({ image, setImages, order }) => {

  const clearImage = useCallback(() => {
    setImages(prev => {
      return prev.filter(v => v !== image)
    })
  }, [setImages, image])

  return (
    <ImageWrapper>
      <Image
        src={image} alt="image" 
        layout="fill"
        objectFit="contain"
      />
      <IconButton onClick={clearImage}>
        <CloseIcon />
      </IconButton>
      <div>{order + 1}</div>
    </ImageWrapper>
  );
};

export default PreviewImage;
