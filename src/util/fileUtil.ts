const fileUtil = {
  getInput(filterStrs: string[]): Promise<File[]> {
    return new Promise((resolve, reject) => {
      let input: HTMLInputElement = document.createElement("input");
      input.type = "file";
      input.multiple = true; // 允许选择多个文件
      input.addEventListener("change", (event: Event) => {
        const fileInput = event.target as HTMLInputElement;
        const files: FileList | null = fileInput.files;
        if (files && files.length > 0) {
          const fileList: File[] = [];
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (filterStrs.includes(file.type)) {
              fileList.push(file);
            } else {
              console.log(file);
              reject(new Error("文件不符合"));
              return;
            }
          }
          resolve(fileList);
        } else {
          reject(new Error("未选择文件"));
        }
      });
      input.click();
    });
  },
};

export default fileUtil;
