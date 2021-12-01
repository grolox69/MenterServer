import "dotenv/config";
import createServer from "server";
import connectDb from "config/atlas/atlasSetup";

const startServer = () => {
  const app = createServer();
  const port: number = parseInt(<string>process.env.PORT, 10) || 4000;

  connectDb().then(() => {
    console.log("Connected to db.")
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  })
};

startServer();
