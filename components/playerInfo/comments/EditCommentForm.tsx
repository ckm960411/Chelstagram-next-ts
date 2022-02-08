import { FC } from "react";
import { Alert, Button, TextField } from "@mui/material";

type PropTypes = {
  text: string
  editCommentRef: React.RefObject<HTMLInputElement>
  onSubmit: () => void
  setEditing: (value: React.SetStateAction<boolean>) => void
  commentError: string
  setCommentError: React.Dispatch<React.SetStateAction<string>>
}

const EditCommentForm: FC<PropTypes> = ({ 
  text, editCommentRef, onSubmit, setEditing, commentError, setCommentError
}) => {
  return (
    <>
      <TextField
        defaultValue={text}
        multiline
        rows={2}
        fullWidth
        variant="outlined"
        inputRef={editCommentRef}
      />
      <Button
        variant="contained" 
        sx={{ float: 'right', marginTop: 1 }}
        onClick={onSubmit}
      >
        Edit Comment
      </Button>
      <Button
        variant="outlined" 
        sx={{ float: 'right', marginTop: 1, marginRight: 1 }}
        onClick={() => {
          setEditing(false)
          setCommentError('')
        }}
      >
        Cancel
      </Button>
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