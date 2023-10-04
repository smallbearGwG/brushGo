/**
 * 评价
 */
export default interface Comment {
  uuid: string;
  name: string;
  shopId: string;
  mainComment: string[];
  appendComment: string[];
  createTime: Date;
  updateTime: Date;
}
