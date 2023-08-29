import { IpcMainInvokeEvent } from "electron";

import GiftService from "../service/giftService";
import SppechService from "../service/sppechService";
import ShopService from "../service/shopService";

const serviceMap = new Map<string, Map<string, Function>>();

const registerService = (serviceClass: any) => {
  const className = serviceClass.sName;
  const methods: string[] = Object.getOwnPropertyNames(
    Reflect.getPrototypeOf(serviceClass)
  ).filter((name) => name !== "constructor");

  if (className && methods && className.length !== 0 && methods.length !== 0) {
    const newServiceSet = new Map();
    methods.forEach((method) => {
      newServiceSet.set(method, serviceClass[method]);
    });
    serviceMap.set(className, newServiceSet);
  }
};

/**
 * 处理线程请求
 */
const brushService = () => {
  registerService(new SppechService());
  registerService(new GiftService());
  registerService(new ShopService());

  return (
    _event: IpcMainInvokeEvent,
    serviceName: string,
    requestHeader: string,
    requestData: any
  ): any => {
    const serviceFunction = getServiceImplinMap(serviceName, requestHeader);
    if (serviceFunction) {
      //判断该function的参数数量
      //如果有参数则传入requestData
      const paramCount = (serviceFunction as (...args: any[]) => any).length;
      if (paramCount > 0) {
        return serviceFunction(requestData);
      } else {
        return serviceFunction();
      }
    }
    return undefined;
  };
};

/**
 * 拿到对应的service方法
 */
const getServiceImplinMap = (
  serviceName: string,
  requestHeader: string
): Function | undefined => {
  if (serviceMap.get(serviceName)) {
    const functionsMap = serviceMap.get(serviceName) as Map<string, Function>;
    if (functionsMap.get(requestHeader)) {
      const func = functionsMap.get(requestHeader);
      return func;
    }
    return undefined;
  }
  return undefined;
};

export default brushService;
