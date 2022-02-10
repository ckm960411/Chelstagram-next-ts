import React, { FC, useEffect, useState } from "react";
import { Alert, CardContent, Dialog } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { editPost } from "store/postsSlice";
import TextInput from "components/atoms/TextInput";
import MainButton from "components/atoms/MainButton";
import InputFileForm from "components/talk/feedforms/InputFileForm";
import PreviewImagesTab from "components/talk/feedforms/PreviewImagesTab";

const EditFeedModal: FC<EditFeedModalProps> = ({ post, editing, setEditing }) => {
  const dispatch = useAppDispatch()
  const { id, content: { postText, postImg }, author: { userId } } = post
  const [images, setImages] = useState<string[]>([])
  const [editFeedError, setEditFeedError] = useState<string>('')
  const [editText, setEditText] = useState<string>('')
  const myInfo = useAppSelector(state => state.users.myInfo)

  useEffect(() => {
    setImages(postImg)
    setEditText(postText)
  }, [postImg, postText])

  const onCloseModal = () => {
    setEditing(false)
    setImages(postImg)
  }

  const onChangeEditText = (e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)

  const onSubmit = () => {
    if (editText.trim() === '') {
      return setEditFeedError("There can't be empty content in the feeds")
    }
    if (!myInfo) {
      return alert('You can modify the feeds after logging in.')
    }
    if (myInfo.id !== userId) {
      return alert(`You can't modify it unless it's your feed.`)
    }
    const data: EditFeedType = {
      postId: id,
      postText: editText,
      postImg: images
    }
    dispatch(editPost(data))
    setEditing(false)
  }

  return (
    <Dialog
      open={editing}
      onClose={onCloseModal}
      fullWidth
    >
      <CardContent>
        <TextInput
          value={editText}
          onChange={onChangeEditText}
        />
        <div>
          <InputFileForm label="edit-input-file" images={images} setImages={setImages} />
          <MainButton onClick={onSubmit}>Edit Feed</MainButton>
          <MainButton
            variant="outlined"
            sx={{ float: 'right', mt: 1, mr: 1 }}
            onClick={onCloseModal}
          >
            cancel
          </MainButton>
        </div>
        { editFeedError !== '' && (
          <Alert
            severity="warning" 
            onClose={() => setEditFeedError('')}
            sx={{ marginTop: 2 }}
          >
            <>There can&apos;t be empty content in the feeds.</>
          </Alert>
        )}
      </CardContent>
      {images[0] && <PreviewImagesTab images={images} setImages={setImages} />}
    </Dialog>
  )
}

export default EditFeedModal