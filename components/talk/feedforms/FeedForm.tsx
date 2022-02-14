import { FC, useState, useCallback } from "react";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { addPost } from "store/postsSlice";
import TextInput from "components/parts/TextInput";
import MainButton from "components/parts/MainButton";
import PreviewImagesTab from "components/talk/feedforms/PreviewImagesTab";
import InputFileForm from "components/talk/feedforms/InputFileForm";

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
    const data: PostFeedType = {
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
        <InputFileForm label="input-file" images={images} setImages={setImages} />
        <MainButton 
          onClick={onSubmitPost}
          disabled={postText.trim() === ''}
        >
          Add Post
        </MainButton>
      </div>
      {images[0] && <PreviewImagesTab images={images} setImages={setImages} />}
    </Box>
  )
}

export default FeedForm