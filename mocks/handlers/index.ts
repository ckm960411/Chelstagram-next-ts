import { userHandlers } from "mocks/handlers/userHandlers";
import { playerHandlers } from "mocks/handlers/playerHandlers";
import { postHandlers } from "mocks/handlers/postHandlers";

export const handlers = [
  ...userHandlers,
  ...playerHandlers,
  ...postHandlers,
]