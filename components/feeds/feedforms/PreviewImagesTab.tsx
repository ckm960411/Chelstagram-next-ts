import { FC, useCallback } from "react";
import { Box } from "@mui/system";
import { Card, CardContent, CardHeader, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PreviewImage from "components/feeds/feedforms/PreviewImage";

const PreviewImagesTab: FC<PreviewImagesTabProps> = ({ images, setImages }) => {

  const clearAttachments = useCallback(() => {
    const ok = window.confirm('Do you really want to cancel the attachment of the images?')
    if (!ok) return
    setImages([])
  }, [setImages])

  return (
    <Box>
      <Card sx={{ mt: 1 }}>
        <CardHeader 
          subheader="Images Preview"
          action={
            <IconButton onClick={clearAttachments}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Stack direction="row" spacing={1} sx={{ overflowX: 'scroll' }}>
            {images.map((image, i) => <PreviewImage key={i} image={image} setImages={setImages} order={i} />)}
          </Stack>
        </CardContent>
        <CardContent sx={{ pt: 1 }}>
          <Typography variant="body2">Up to 10 images can be attached.</Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default PreviewImagesTab