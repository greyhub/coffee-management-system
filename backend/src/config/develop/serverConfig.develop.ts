import env from "../../env";

export default {
  throwSystemError: true,
  urlPrefix: `localhost:${env.PORT}/`,
  shouldAuth: false,
  timeoutToken: 36000 // second
}