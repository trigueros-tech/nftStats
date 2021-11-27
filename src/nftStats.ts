import fs from "fs"

let metadatas = "./assets/Sample2/metadatas/"

const files = fs.readdirSync(metadatas)
let stats : Map<string, number> = new Map<string, number>()

for (const file of files) {
  fs.readFile(metadatas+"/"+file , function (err, data) {
    if (err) {
        return console.error(err)
    } else {
      metadatas = JSON.parse(data.toString())
      let name = metadatas["name"];
      console.log(stats[name])
      if (stats[name] === undefined) {
        stats[name] = 1
      } else {
        stats[name] += 1
      }
      for(let attribute of metadatas["attributes"]) {
        console.log(attribute["trait_type"] + "->" + attribute["value"])
      }

    }
    console.log(stats)
  });

}