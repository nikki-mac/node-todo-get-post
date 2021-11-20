const router = require("express").Router();
const controller = require("./todo.controller");

router
  .route("/")
  .get(controller.list) //routed GET
  .post(controller.create) //routed POST

router
  .route("/:todo_id")
  .get(controller.read)
  .patch(controller.update)
  .delete(controller.destroy)

module.exports = router;
