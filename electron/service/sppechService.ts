import Speech from "../../common/speech";
import dataUtil from "../lib/dataUtil";
import uuid from "../lib/uuid";

interface SppechService {
  getAllSppech: Function;
  getSingleSppech: Function;
  addSppech: Function;
  updateSpeech: Function;
  removeSpeech: Function;
}

const lowData = dataUtil<Speech[]>("sppech");

class SppechSeviceImpl implements SppechService {
  /**
   * 获取全部的话术
   */
  getAllSppech(): Speech[] {
    lowData.read();
    const data = lowData.data;
    lowData.write();
    return data;
  }
  /**
   * 获取单个的话术
   */
  getSingleSppech(content: string): Speech {
    lowData.read();
    const data = lowData.data;
    for (let i = 0; i < data.length; i++) {
      const currentData = data[i];
      if (currentData.content === content) {
        //名称重复
        return currentData;
      }
    }
    return {};
  }
  addSppech(content: string) {
    if (content === "" || content.length === 0) {
      return false;
    }
    lowData.read();
    const data = lowData.data;
    for (let i = 0; i < data.length; i++) {
      const currentData = data[i];
      if (currentData.content === content) {
        //内容
        return false;
      }
    }
    data.push({
      uuid: uuid(),
      content: content,
      createTime: new Date(),
      updateTime: new Date(),
    });
    lowData.write();
    return true;
  }
  updateSpeech(speech: Speech) {
    if (speech.content === "" || speech.content?.length === 0) {
      return false;
    }
    lowData.read();
    for (let i = 0; i < lowData.data.length; i++) {
      if (lowData.data[i].uuid === speech.uuid) {
        lowData.data[i].uuid = speech.uuid;
        lowData.data[i].content = speech.content;
        lowData.data[i].updateTime = speech.updateTime;
      }
    }
    lowData.write();
    return true;
  }
  removeSpeech(sppech: Speech) {
    lowData.read();
    for (let i = 0; i < lowData.data.length; i++) {
      const data = lowData.data[i];
      if (data.uuid === sppech.uuid) {
        lowData.data.splice(i, 1);
        lowData.write();
        return true;
      }
    }
    return false;
  }
}

export type { SppechService };
export default new SppechSeviceImpl();
