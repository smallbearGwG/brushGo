import Image from "../../common/Image";
import dataUtil from "../lib/dataUtil";

interface ImageService {
  getAllImage: Function;
  getSingleImage: Function;
  addImage: Function;
  updateImage: Function;
  removeImage: Function;
}

const lowData = dataUtil<Image[]>("image");

class ImageServiceImpl implements ImageService {
  getAllImage() {
    
  }
  getSingleImage() {}
  addImage() {}
  updateImage() {}
  removeImage() {}
}
