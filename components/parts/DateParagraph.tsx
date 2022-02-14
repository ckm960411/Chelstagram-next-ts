import { FC, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { formatDistanceToNowStrict } from "date-fns";

const DateParagraph: FC<DateParagraphProps> = ({ createdAt, modifiedAt }) => {
  const [timeAgo, setTimeAgo] = useState<string>('0')

  useEffect(() => {
    if (createdAt === modifiedAt) {
      setTimeAgo(formatDistanceToNowStrict(Date.parse(createdAt)))
    } else {
      setTimeAgo(formatDistanceToNowStrict(Date.parse(modifiedAt)))
    }
  }, [createdAt, modifiedAt, setTimeAgo])

  return (
    <Typography variant="body2">
      { createdAt !== modifiedAt 
        ? `${modifiedAt.slice(0, -3)} (modified ${timeAgo} ago)` 
        : `${createdAt.slice(0, -3)} (${timeAgo} ago)`
      }
    </Typography>
  )
}

export default DateParagraph