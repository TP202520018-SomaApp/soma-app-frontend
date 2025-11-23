// train.cjs
const fs  = require("fs");
const { parse } = require("csv-parse");
const { RandomForestRegression } = require("ml-random-forest");

console.log('Entrenamiento iniciado', new Date().toLocaleDateString("es-ES"))

const features = [];
const labels = [];

fs.createReadStream("dataset.csv")
    .pipe(parse({ columns: true }))
    .on("data", (row) => {
        features.push([
            +row.edad,
            +row.peso,
            +row.altura_cm,
            +row.peso_factores_riesgo,
            +row.tamano_tumor,
            +row.num_ganglios,
            +row.metastasis,
            +row.marcador,
            +row.quimioterapia,
            +row.ciclos_quimio,
            +row.radioterapia,
            +row.cirugia,
            +row.margen,
            +row.meses_sin_control,
            +row.num_citas,
            +row.sintomas,
            +row.falta_controles
        ]);

        labels.push(+row.riesgo_recaida); // entre 0.01 y 1.00
    })
    .on("end", () => {
        console.log("Entrenando modelo RandomForestRegression...");

        const rf = new RandomForestRegression({
            nEstimators: 200,
            maxFeatures: 0.8,
            selectionMethod: "mean",  // promedio de predicciones
            replacement: true,
            seed: 42
        });

        rf.train(features, labels);

        fs.writeFileSync("modelo_rf.json", JSON.stringify(rf.toJSON()));
        console.log('Entrenamiento finalizado', new Date().toLocaleDateString("es-ES"))
        console.log("Modelo entrenado y guardado como modelo_rf.json");
    });