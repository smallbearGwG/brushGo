import { ElMessage } from "element-plus";

interface SElMEssageParam {
  message: string;
  type: string;
}

const OFFSET = 64;

const SElMEssage = (param: SElMEssageParam) => {
  ElMessage({
    showClose: true,
    message: param.message,
    type: param.type,
    offset: OFFSET,
  });
};

export default SElMEssage;
