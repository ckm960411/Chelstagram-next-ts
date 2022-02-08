import { FC } from "react";
import { StyledMenu } from "lib/utils/styled-menu";
import { Grid, IconButton, MenuItem } from "@mui/material";
import { MoreVert as MoreVertIcon, Edit as EditIcon, ReportProblem as ReportProblemIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { UserType } from "types/userType";

type PropTypes = {
  anchorEl: HTMLElement | null
  handleClick: (event: React.MouseEvent<HTMLElement>) => void
  handleClose: () => void
  onEditComment: () => void
  onDeleteComment: () => void
  myInfo: UserType | null
  userId: number
}

const CommentMenu: FC<PropTypes> = ({
  myInfo, userId, anchorEl, handleClick, handleClose, onEditComment, onDeleteComment
}) => {
  const open = Boolean(anchorEl);

  return (
    <Grid item>
      <IconButton aria-label="more button" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        { myInfo && myInfo.id === userId ? (
          <div>
            <MenuItem onClick={onEditComment} disableRipple>
              <EditIcon />
              Edit
            </MenuItem>
            <MenuItem onClick={onDeleteComment} disableRipple>
              <DeleteIcon />
              Delete
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem onClick={handleClose} disableRipple>
              <ReportProblemIcon />
              Report Problem
            </MenuItem>
          </div>
        )}
      </StyledMenu>
    </Grid>
  )
}

export default CommentMenu