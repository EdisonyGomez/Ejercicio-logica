import * as fs from "fs";
import * as path from "path";
const parse = require('csv-parser');
const filepath = "./time_series_covid19_deaths_US.csv"
//fechas
let dates: number[] = [];
//datos completos
let arrayData = [];
fs.createReadStream(path.resolve(__dirname, filepath), 'utf8')
  .on('error', error => console.error(error))
  .pipe(parse({ Headers: true }))
  .on('data', (row) => {
    //guardo en una variable los datos de la ultima columna que es la que interesa
    let info_data = `${row["4/27/21"]}`;

    //los datos lo agrego a un vector
    dates.push(Number(info_data));
    
    //creo un nuevo array y le agrego los datos del csv
    arrayData.push(row);
  })
  .on('end', (rowCount: any) => {
    let sum: number = 0;
    //recorro el array de fechas y utilizo el length para identificar los 
    //datos correspondientes a los estados
    for (let i = 0; i < dates.length; i++) {
      //Tomo como valor de referencia la primera posicion y voy preguntando si la 
      //siguiente posicion tiene el mismo nombre del estado para agrupar y 
      //realizar la suma correspondiente de los valores del array de fechas
      if (arrayData[0].Province_State == arrayData[i].Province_State) {
        sum = sum + dates[i];
      }
    }
    console.log(arrayData[0].Province_State, ":", sum)
  });