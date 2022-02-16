import { FC, useState } from "react"
import { Box, IconButton, styled } from "@mui/material"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ClearIcon from '@mui/icons-material/Clear';
import ProfileImage from "components/profile/ProfileImage";

const Input = styled('input')({ display: 'none' })

const EditProfileImageForm: FC<EditProfileImageProps> = ({ image, setImage, nickname }) => {

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImage(reader.result as string)
    reader.readAsDataURL(file)
  }

  const onClearImage = () => setImage(null)

  return (
    <Box sx={{ mb: 4, position: 'relative' }}>
      <ProfileImage 
        profileImg={image}
        nickname={nickname}
      />
      <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
        <label htmlFor="edit-profile-image">
          <Input 
            accept="image/*"
            id="edit-profile-image"
            type="file"
            onChange={onImageChange}
          />
          <IconButton color="primary" component="span">
            <PhotoCameraIcon />
          </IconButton> 
        </label>
        {image && (
          <IconButton color="primary" onClick={onClearImage}>
            <ClearIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  )
}

export default EditProfileImageForm