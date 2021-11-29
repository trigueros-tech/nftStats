import fs from "fs"
import { readFile } from 'fs/promises';

let metadatas = "./assets/Sample2/metadatas/"

async function  main(path : string) {
  const files = fs.readdirSync(path)
  let stats = {}
  let filesHandles = []
  for (const file of files) {
    filesHandles.push(
      readFile(path+"/"+file)
        .then(function (data) {

          metadatas = JSON.parse(data.toString())

          for(let attribute of metadatas["attributes"]) {
            //console.log(attribute["trait_type"] + "->" + attribute["value"])

            if (!stats[attribute["trait_type"]]) {
              stats[attribute["trait_type"]] = {[attribute["value"]] : 1}
            } else {
              if (!stats[attribute["trait_type"]][attribute["value"]]) {
                stats[attribute["trait_type"]][attribute["value"]] = 1
              } else {
                stats[attribute["trait_type"]][attribute["value"]]++
              }
            }
          }
    }))
  }
  await Promise.all(filesHandles)

  //console.log(stats)
  Object.entries(stats).forEach(([key,value])=>{
    console.log(key)
    Object.entries(value as any).forEach(([vkey,vvalue])=>{
      console.log(vkey + " : " + vvalue)
    })
    console.log("")
  })

}

main(metadatas)
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });