import { da } from "element-plus/es/locale/index.js";
import Speech from "../../common/speech";
import openData from "../lib/dataHelp";

interface SppechSercie {
  getAllSppech: Function;
  getSingleSppech: Function;
  addSppech: Function;
  updateSppech: Function;
  removeSppech: Function;
}

const lowData = openData<Speech[]>("sppech");

class SppechSeviceImpl implements SppechSercie {
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
    data.forEach((d) => {
      if (d.content === content) {
        return d;
      }
    });
    return {};
  }
  addSppech(name: string) {}
  updateSppech(name: string) {}
  removeSppech() {}
}
