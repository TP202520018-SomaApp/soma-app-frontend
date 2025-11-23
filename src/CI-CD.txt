const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

// CONFIGURACIÓN ============================
const REPO_URL = "https://github.com/TP202520018-SomaApp/soma-app-frontend.git";
const PROJECT_NAME = "soma-app-frontend-temp";

// Carpeta destino EXACTA que pediste:
const DEST_FOLDER = "C:/Users/Tarket/Desktop/nginx/html/somapp";
// ==========================================

// Ejecutar comandos
function run(cmd, cwd = null) {
  return new Promise((resolve, reject) => {
    exec(cmd, { cwd, shell: "powershell.exe" }, (error, stdout, stderr) => {
      if (error) {
        console.error("❌ Error ejecutando:", cmd);
        console.error(stderr);
        return reject(error);
      }
      console.log(stdout);
      resolve(true);
    });
  });
}

// Copiar carpetas recursivamente
function copyFolder(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }

  for (const item of fs.readdirSync(src)) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    if (fs.lstatSync(srcPath).isDirectory()) {
      copyFolder(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

(async () => {
  try {
    console.log("🧹 Eliminando versión temporal previa…");
    if (fs.existsSync(PROJECT_NAME)) {
      fs.rmSync(PROJECT_NAME, { recursive: true, force: true });
    }

    console.log("⬇️  Clonando repositorio SomaApp …");
    await run(`git clone ${REPO_URL} ${PROJECT_NAME}`);

    console.log("📦 Instalando dependencias …");
    await run("npm install", path.join(__dirname, PROJECT_NAME));

    console.log("⚙️ Compilando proyecto Vue …");
    await run("npm run build", path.join(__dirname, PROJECT_NAME));

    const distPath = path.join(__dirname, PROJECT_NAME, "dist");

    if (!fs.existsSync(distPath)) {
      throw new Error("No se generó la carpeta 'dist'. Verifica el build.");
    }

    console.log("🧹 Limpiando carpeta destino NGINX …");
    if (fs.existsSync(DEST_FOLDER)) {
      fs.rmSync(DEST_FOLDER, { recursive: true, force: true });
    }
    fs.mkdirSync(DEST_FOLDER);

    console.log("📤 Copiando build hacia servidor NGINX …");
    copyFolder(distPath, DEST_FOLDER);

    console.log("✅ DEPLOY COMPLETADO");
    console.log("Archivos disponibles en:");
    console.log(DEST_FOLDER);

  } catch (err) {
    console.error("❌ Error general:", err);
  }
})();