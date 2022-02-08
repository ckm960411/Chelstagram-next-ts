import { FC, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import { useAppSelector } from "store/hooks";
import { PlayerProfile } from "types/playerTypes";

const ImageWrapper = styled.div`
  & span {
    padding-top: 0 !important;
  }
  & > span > img {
    position: relative !important;
    height: unset !important;
  }
`

const PlayerBgImg: FC = () => {
  const player: PlayerProfile | null = useAppSelector(state => state.players.player)
  if (player === null) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <ImageWrapper>
      <Image 
        src={player.backgroundImg} 
        alt={player.name} 
        width="100%" height="100%" layout="responsive"
      />
    </ImageWrapper>
  )
}

export default PlayerBgImg