import React, { FC, useState, useCallback } from "react";
import { Box } from "@mui/material";
import PreviewImagesTab from "components/talk/PreviewImagesTab";
import { useAppDispatch, useAppSelector } from "store/hooks";
import InputFileForm from "components/talk/InputFileForm";
import { addPost } from "store/postsSlice";
import TextInput from "components/atoms/TextInput";
import MainButton from "components/atoms/MainButton";

export type PostSubmitType = {
  userId: number
  postText: string
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
      userId: myInfo.id!,
      postText,
      postImg: images
    }
    dispatch(addPost(data))
    setPostText('')
    setImages([])
  }, [images, myInfo, postText, dispatch])

  return (
    <Box>
      <TextInput 
        label="How do you feel today?"
        rows={3}
        value={postText}
        onChange={onChangeText}
      />
      <div>
        <InputFileForm images={images} setImages={setImages} />
        <MainButton onClick={onSubmitPost}>Add Post</MainButton>
      </div>
      {images[0] && <PreviewImagesTab images={images} setImages={setImages} />}
    </Box>
  )
}

export default FeedForm