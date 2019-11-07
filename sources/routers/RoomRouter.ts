import Controllers from "../controllers";
// import Middlewares from "../middlewares";

import BaseRouter from "./BaseRouter";

export default class RoomRouter extends BaseRouter {
  constructor(controllers: Controllers /* middlewares: Middlewares */) {
    super("/rooms");

    this.router.get("/", controllers.roomController.getRooms); // Keep it for debug
    this.router.post("/", controllers.roomController.createRoom);
  }
}
