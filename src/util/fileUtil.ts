const fileUtil = {
  getInput(filterStrs: string[]): Promise<File> {
    return new Promise((resolve, reject) => {
      let input: HTMLInputElement = document.createElement("input");
      input.type = "file";
      input.addEventListener("change", (event: Event) => {
        const fileInput = event.target as HTMLInputElement;
        const file: File | undefined = fileInput.files?.[0];
        // console.log(filterStrs);
        if (file && filterStrs.includes(file.type)) {
          resolve(file);
        } else {
          
          console.log(file)
          reject(new Error("文件不符合"));
        }
      });
      input.click();
    });
  },
};

export default fileUtil;
