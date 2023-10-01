/**
 * 任务
 */
export default interface Task {
  uuid?: string;
  operator?: string;
  shop?: string;
  time?: string;
  showTime?: string;
  orderNumber?: string;
  orderId?: string;
  amount?: string;
  gift?: string;
  expenditureChannel?: string;
  note?: string;
  operationPhone?: string;
  phoneNumber?: string;
  productName?: string;
  keywords?: string;
  jdToTbId?: string;
  createTime?: Date;
  updateTime?: Date;
}
