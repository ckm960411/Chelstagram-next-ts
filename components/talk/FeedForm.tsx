import React, { FC, useState, useCallback } from "react";
import { Box, Button, TextField } from "@mui/material";
import PreviewImagesTab from "components/talk/PreviewImagesTab";
import { useAppDispatch, useAppSelector } from "store/hooks";
import InputFileForm from "components/talk/InputFileForm";
import { addPost } from "store/postsSlice";

export type PostSubmitType = {
  userId: string
  postText: string
  date: number
  postImg: string[]
}

const FeedForm: FC = () => {
  const dispatch = useAppDispatch()
  const [images, setImages] = useState<string[]>([])
  const [postText, setPostText] = useState<string>('')
  const myInfo = useAppSelector(state => state.users.myInfo)

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostText(e.target.value)
  }

  const onSubmitPost = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!myInfo) return alert('Only logged-in users can write posts.')
    if (postText === '') return alert('Please fill out the post.')
    const data: PostSubmitType = {
      userId: myInfo.userId!,
      postText,
      date: Date.now(),
      postImg: images
    }
    dispatch(addPost(data))
  }, [images, myInfo, postText, dispatch])

  return (
    <Box>
      <TextField
        label="How do you feel today?"
        multiline
        rows={3}
        fullWidth
        variant="outlined"
        value={postText}
        onChange={onChangeText}
      />
      <div>
        <InputFileForm images={images} setImages={setImages} />
        <Button
          variant="contained"
          sx={{ float: 'right', marginTop: 1 }}
          onClick={onSubmitPost}
          >
          Add Post
        </Button>
      </div>
      {images[0] && <PreviewImagesTab images={images} setImages={setImages} />}
    </Box>
  )
}

export default FeedForm