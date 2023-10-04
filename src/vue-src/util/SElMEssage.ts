import { ElMessage } from "element-plus";

interface SElMEssageParam {
  message: string;
  type: string;
}

const OFFSET = 64;

const SElMEssage = (param: SElMEssageParam) => {
  ElMessage({
    type: param.type,
    offset: OFFSET,
    center: true,
    message: param.message,
    grouping: true,
  });
};

export default SElMEssage;
