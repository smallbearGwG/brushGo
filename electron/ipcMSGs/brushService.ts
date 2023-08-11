import { IpcMainInvokeEvent } from "electron";

import giftService from "../service/giftService";
import SppechService from "../service/sppechService";

const serviceMap = new Map<string, Map<string, Function>>();

const giftServiceMap = new Map<string, Function>();
giftServiceMap.set("getAllGift", giftService.getAllGift);
giftServiceMap.set("getSingleGift", giftService.getSingleGift);
giftServiceMap.set("addGift", giftService.getSingleGift);
giftServiceMap.set("updateGift", giftService.updateGift);
giftServiceMap.set("removeGift", giftService.removeGift);

serviceMap.set("giftService", giftServiceMap);

const sppechServiceMap = new Map<string, Function>();
sppechServiceMap.set("getAllSppech", SppechService.getAllSppech);
sppechServiceMap.set("getSingleSppech", SppechService.getSingleSppech);
sppechServiceMap.set("addSppech", SppechService.addSppech);
sppechServiceMap.set("updateSpeech", SppechService.updateSpeech);
sppechServiceMap.set("removeSpeech", SppechService.removeSpeech);

serviceMap.set("sppechService", sppechServiceMap);

/**
 * 处理线程请求
 */
const brushService = (
  event: IpcMainInvokeEvent,
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
