import { FC, useState } from "react"
import { Alert, Box, CardContent, CardHeader, Dialog, Stack } from "@mui/material"
import TextInput from "components/parts/TextInput"
import MainButton from "components/parts/MainButton";
import EditProfileImageForm from "components/profile/EditProfileImageForm";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { closeError, editProfileRequest } from "store/usersSlice";

const EditProfileForm: FC<EditProfileProps> = ({ editing, setEditing, myInfo }) => {
  // const { id, email, name, nickname, profileImg } = myInfo
  const dispatch = useAppDispatch()
  const [name, setName] = useState<string>(myInfo.name)
  const [nickname, setNickname] = useState<string>(myInfo.nickname)
  const [image, setImage] = useState<string | null>(myInfo.profileImg)
  const [editProfileError, setEditProfileError] = useState<string>('')

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'name') {
      setName(value)
    } else if (name === 'nickname') {
      setNickname(value)
    }
    return
  }

  const onCloseModal = () => {
    setEditing(false)
    setEditProfileError('')
    dispatch(closeError()) 
  }

  const onSubmitEditForm = () => {
    if (nickname === '') return setEditProfileError('The nickname cannot be empty.')
    if (name === '') return setEditProfileError('The name cannot be empty.')
    if (name === myInfo.name && nickname === myInfo.nickname && image === myInfo.profileImg) {
      return onCloseModal()
    }
    const data: EditProfileType = {
      userId: myInfo.id,
      name,
      nickname,
      profileImg: image
    }
    dispatch(editProfileRequest(data)).then(action => {
      if (action.payload.errorMessage) return setEditProfileError(action.payload.errorMessage)
      onCloseModal()
    })

  }

  return (
    <Dialog
      open={editing}
      onClose={onCloseModal}
      fullWidth
    >
      <CardHeader 
        title="Edit Your Profile" 
        titleTypographyProps={{ color: '#001487', fontWeight: 600 }}
      />
      <CardContent>
        <EditProfileImageForm image={image} setImage={setImage} nickname={nickname} />
        <Stack spacing={1}>
          <TextInput
            name="nickname"
            label="your nickname"
            value={nickname}
            onChange={onChangeInput}
            rows={1}
          />
          <TextInput
            name="name"
            label="your name"
            value={name}
            onChange={onChangeInput}
            rows={1}
          />
        </Stack>
        { editProfileError !== '' && (
          <Alert
            severity="error" 
            onClose={() => {
              setEditProfileError('')
              dispatch(closeError())
            }}
            sx={{ mt: 1 }}
          >
            <>{editProfileError}</>
          </Alert>
        )}
        <div>
          <MainButton 
            onClick={onSubmitEditForm}
          >
            Edit Profile
          </MainButton>
          <MainButton
            variant="outlined"
            sx={{ float: 'right', mt: 1, mr: 1 }}
            onClick={onCloseModal}
          >
            cancel
          </MainButton>
        </div>
        
      </CardContent>
    </Dialog>
  )
}

export default EditProfileForm