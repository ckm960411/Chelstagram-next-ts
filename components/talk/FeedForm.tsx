import React, { FC, useState } from "react";
import { Box, Button, IconButton, styled, TextField } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import PreviewImagesTab from "components/talk/PreviewImagesTab";

const Input = styled('input')({ display: 'none' })

const FeedForm: FC = () => {
  const [images, setImages] = useState<string[]>([])

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!
    if (!files[0]) return
    if ((images.length + files.length) > 10) {
      return alert('You can only attach up to 10 pictures.')
    }
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader()
      reader.onload = () => {
        setImages(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(files[i])
    }
  }

  return (
    <Box>
      <TextField
        label="How do you feel today?"
        multiline
        rows={3}
        fullWidth
        variant="outlined"
        // value={post}
        // onChange
      />
      <div>
        <label htmlFor="icon-button-file">
          <Input 
            accept="image/*" 
            id="icon-button-file" 
            multiple
            type="file" 
            onChange={onFileChange}
          />
          <Button 
            color="primary" 
            component="span" 
            sx={{ mt: 1 }} 
            startIcon={<PhotoCamera />}
          >
            upload images
          </Button>
        </label>
        <Button
          variant="contained"
          sx={{ float: 'right', marginTop: 1 }}
          // onClick={onClick}
          >
          Add Post
        </Button>
      </div>
      {images[0] && <PreviewImagesTab images={images} setImages={setImages} />}
    </Box>
  )
}

export default FeedForm