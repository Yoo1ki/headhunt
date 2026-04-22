import { jsonError } from "@/lib/api-response";

const handleAll = () => jsonError("Not Found", 404);

export {
  handleAll as GET,
  handleAll as POST,
  handleAll as PUT,
  handleAll as DELETE,
};
