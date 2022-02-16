import { FC } from "react";
import styled from "styled-components";
import Image from "next/image";
import profileImg from "public/imgs/Kepa-Arrizabalaga.png";

const ImageWrapper = styled.div`
  height: 200px;
  width: 200px;
  background-color: #e9e9e9;
  border-radius: 50%;
  position: relative;
  margin: auto;
  overflow: hidden;
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
    bottom: 0;
    left: 0;
    width: 30px;
    height: 30px;
    background-color: #001487;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
  }
`;

const ProfileImage: FC = () => {
  return (
    <ImageWrapper>
      <Image
        src={profileImg} alt="profileImg"
        layout="fill"
        objectFit="contain"
      />
    </ImageWrapper>
  );
};

export default ProfileImage;
