
const Column = require("../models/column");

exports.generateBoardColumns = async (boardId) => {
 const columns = await Column.find({ boardId: boardId });
 let columnsObjectIds = [];

 if (columns.length == 0) {
  let defaultColumnNames = ["In Progress", "Completed"]
  defaultColumnNames.forEach((name) => {
   let newColumn = new Column({
    boardId, boardId,
    name: name,
    tasks: [],
   });
   newColumn.save();
   columnsObjectIds.push(newColumn._id);
  })
 } else {
  columns.forEach((column) => {
   columnsObjectIds.push(column._id);
  });
 }
 return columnsObjectIds;
}