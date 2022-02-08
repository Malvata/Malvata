export class Utils {
  public static getUrlParam(name: string) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const para = urlParams.get(name)
    return para;
  }
  public static getUrlHash(name:string){
    const queryString = window.location.hash.replace('#',"?");
    const urlParams = new URLSearchParams(queryString);
    const para = urlParams.get(name)
    return para;
  }
  public static async readRemoteJson(url: string) {
    return new Promise<any>((res, rej) => {
      fetch(url)
        .then((response) => response.json())
        .then(json => {
          res(json);
        }).catch((e) => {
          res(false);
        })
    })
  }
  public static async remoteFileExit(url: string) {
    return new Promise<boolean>((res, rej) => {
      fetch(url).then(function (response) {
        if (!response.ok) {
          // make the promise be rejected if we didn't get a 2xx response
          res(false)
        } else {
          // go the desired response
          res(true)
        }
      })
    })
  }
  public static openLocalFile(accept: string, callback: (file: File) => void) {
    let inputEl: HTMLInputElement = undefined;//<HTMLInputElement>document.getElementById('file_input');
    if (!inputEl) {
      inputEl = document.createElement('input');
      inputEl.id = 'file_input';
      inputEl.setAttribute('id', 'file_input');
      inputEl.setAttribute('type', 'file');
      inputEl.setAttribute('class', 'fileToUpload');
      // inputEl.setAttribute('multiple', 'multiple');// 多选
      // inputEl.setAttribute('required', 'required');
      inputEl.style.opacity = '0';
      inputEl.style.position = 'absolute';
      inputEl.setAttribute('left', '-999px');
      document.body.appendChild(inputEl);
    }


    accept = accept || ".*";
    inputEl.setAttribute('accept', accept);

    // inputEl.addEventListener('change', (event) => {
    //     console.log('xxx onchange1', event, inputEl.value);
    // });
    inputEl.onchange = (event) => {
      // console.log('xxx onchange2', event, inputEl.files);
      let files = inputEl.files
      if (files && files.length > 0) {
        var file = files[0];
        if (callback) callback(file);
      }
    }
    inputEl.click();
    document.body.removeChild(inputEl)
  }
  public static async saveLocalFile(contents) {
    const opts = {
      types: [{
        description: 'save form.json',
        accept: { 'text/plain': ['.json'] },
      }],
    };
    let fileHandle =await (window as any).showSaveFilePicker(opts);
    const writable = await fileHandle.createWritable();

    // Write the contents of the file to the stream.
    await writable.write(contents);
    // Close the file and write the contents to disk.
    await writable.close();
  }
  public static async readJsonFile(file: File) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()
      reader.readAsText(file, 'utf-8')
      reader.onload = function (evt) {
        let obj = JSON.parse(reader.result as string);
        resolve(obj)
      }
    })
  }

}

