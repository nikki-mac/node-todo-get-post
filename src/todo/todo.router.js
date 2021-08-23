const router = require("express").Router();
const controller = require("./todo.controller");

router
  .route("/")
  .get(/* Your code here */)
  .post(/* Your code here */)

router
  .route("/:todo_id")
  .get(controller.read)
  .patch(controller.update)
  .delete(controller.destroy)

module.exports = router;