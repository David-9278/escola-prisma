-- CreateTable
CREATE TABLE "Turma" (
    "codigo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "idioma" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Estudante" (
    "codigo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "turmaCodigo" INTEGER NOT NULL,
    CONSTRAINT "Estudante_turmaCodigo_fkey" FOREIGN KEY ("turmaCodigo") REFERENCES "Turma" ("codigo") ON DELETE CASCADE ON UPDATE CASCADE
);
