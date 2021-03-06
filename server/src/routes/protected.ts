import Router from "koa-router";

import { LickController } from "../controller/lick";
import { UserController } from "../controller/user";
import { isAuthenticated } from "../middleware/auth-validator";

const protectedRouter: Router = new Router();

protectedRouter.prefix("/api")
protectedRouter.use(isAuthenticated);

// User routes
protectedRouter.get("/users", UserController.getUsers);
protectedRouter.get("/users/:id", UserController.getUser);
protectedRouter.post("/users", UserController.createUser);
protectedRouter.put("/users/:id", UserController.updateUser);
protectedRouter.delete("/users/:id", UserController.deleteUser);
protectedRouter.delete("/testusers/:id", UserController.deleteTestUser);

// Lick routes
protectedRouter.post("/licks", LickController.createLick);
protectedRouter.put("/licks/:id", LickController.updateLick);
protectedRouter.delete("/licks/:id", LickController.deleteLick);

export { protectedRouter };