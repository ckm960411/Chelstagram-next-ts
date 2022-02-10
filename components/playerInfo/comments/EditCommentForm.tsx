import { FC } from "react";
import { Alert } from "@mui/material";
import TextInput from "components/atoms/TextInput";
import MainButton from "components/atoms/MainButton";

const EditCommentForm: FC<EditCommentFormProps> = ({ 
  text, editCommentRef, onSubmit, setEditing, commentError, setCommentError
}) => {
  return (
    <>
      <TextInput 
        defaultValue={text}
        inputRef={editCommentRef}
      />
      <MainButton onClick={onSubmit}>Edit Comment</MainButton>
      <MainButton
        variant="outlined" 
        sx={{ float: 'right', mt: 1, mr: 1 }}
        onClick={() => {
          setEditing(false)
          setCommentError('')
        }}
      >
        Cancel
      </MainButton>
      { commentError !== '' && (
        <Alert
          severity="warning" 
          onClose={() => setCommentError('')}
          sx={{ marginTop: 7 }}
        >
          <>There can&apos;t be empty content in the comments.</>
        </Alert>
      )}
    </>
  )
}

export default EditCommentForm