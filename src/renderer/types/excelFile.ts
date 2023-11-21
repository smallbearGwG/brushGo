
import { Ref } from 'vue';

export default interface ExcelFile extends File {
    loading?: Ref;
}