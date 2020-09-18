import { server } from "./server";
import "./database";

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
