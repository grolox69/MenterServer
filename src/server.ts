import express, { Application, Request, Response, NextFunction } from "express";
import routes from "routes";
import cors from 'cors';
import AuthMiddleware from "middleware/AuthMiddleware";

export default function createServer() {
  const app: Application = express();

  app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Menter Backend");
  });

  app.use(AuthMiddleware.decodeToken);

  app.use(routes);

  app.use((req: Request, res: Response) => {
		res.status(404).send("Not Found");
	});

  return app;
}
