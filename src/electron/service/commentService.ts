import Comment from "../../common/Comment";
import dataUtil from "../lib/dataUtil";
import uuid from "../lib/uuid";

interface CommentService {
  getAllComment: Function;
  getSingleComment: Function;
  addComment: Function;
  addCommentList: Function;
  updateComment: Function;
  removeComment: Function;
}

const lowData = dataUtil<Comment[]>("comment");

class CommentServiceImpl implements CommentService {
  sName: string = "commentService";
  getAllComment() {
    lowData.read();
    const data = lowData.data;
    // lowData.write();
    return data;
  }
  getSingleComment() {}
  addComment(comment: Comment) {
    lowData.read();
    const data = lowData.data;
    data.push({
      uuid: uuid(),
      name: comment.name,
      shopId: comment.shopId,
      mainComment: comment.mainComment,
      appendComment: comment.appendComment,
      createTime: new Date(),
      updateTime: new Date(),
    });
    lowData.write();
    return true;
  }
  addCommentList(commentList: Comment[]) {
    lowData.read();
    const data = lowData.data;
    commentList.forEach((data) => {
      data.uuid = uuid();
      data.createTime = new Date();
      data.updateTime = new Date();
    });
    data.push(...commentList);
    lowData.write();
  }
  updateComment() {}
  removeComment() {}
}

export type { CommentService };
export default CommentServiceImpl;
