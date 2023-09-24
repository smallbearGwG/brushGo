/**
 * 商品
 */
export default interface Compodity {
  uid?: string;
  operator?: string;
  shop?: string;
  time?: string;
  orderNumber?: string;
  orderId?: string;
  amount?: Number;
  gift?: string;
  expenditureChannel: string;
  note: string;
  opetionPhone: string;
  phoneNumber: string;
  productName: string;
  keyWorld: string;
  jdToTbId: string;
  images?: {
    imageUid: string;
    imageSort: number;
  }[];
  createTime?: Date;
  updateTime?: Date;
}
