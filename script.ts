import { prisma } from "./config/database.js";
import { Turma } from "./negocio/Turma.js";
import { Estudante } from "./negocio/Estudante.js";
import { TurmaDAO } from "./persistencia/TurmaDAO.js";
import { EstudanteDAO } from "./persistencia/EstudanteDAO.js";

const turmaDAO = new TurmaDAO();
const estudanteDAO = new EstudanteDAO();

async function main() {
  console.log("=== CRUD com Prisma e relacionamento 1:N ===\n");


  console.log("--- Criando turmas ---");
  const turmaIngles = await turmaDAO.criar({
    nome: "Inglês Básico",
    horario: "seg-qua 08:00-09:00",
    idioma: "Inglês",
  });
  console.log("Turma criada:", turmaIngles);

  const turmaEspanhol = await turmaDAO.criar({
    nome: "Espanhol Avançado",
    horario: "ter-qui 10:00-11:00",
    idioma: "Espanhol",
  });
  console.log("Turma criada:", turmaEspanhol);


  console.log("\n--- Criando estudantes ---");
  const aluno1 = await estudanteDAO.criar({
    nome: "João Silva",
    turmaCodigo: turmaIngles.codigo,
  });
  console.log("Estudante criado:", aluno1);

  const aluno2 = await estudanteDAO.criar({
    nome: "Maria Santos",
    turmaCodigo: turmaIngles.codigo,
  });
  console.log("Estudante criado:", aluno2);

  const aluno3 = await estudanteDAO.criar({
    nome: "Carlos Oliveira",
    turmaCodigo: turmaEspanhol.codigo,
  });
  console.log("Estudante criado:", aluno3);

  console.log("\n--- Buscando estudante por código ---");
  const est = await estudanteDAO.buscarPorCodigo(aluno1.codigo);
  if (est) {
    console.log(`Encontrado: ${est.nome} - Turma: ${est.turma?.nome}`);
  }

  console.log("\n--- Atualizando turma ---");
  const turmaAtualizada = await turmaDAO.atualizar(turmaIngles.codigo, {
    horario: "seg-qua 09:00-10:00",
  });
  console.log("Horário atualizado:", turmaAtualizada.horario);

  console.log("\n--- Transferindo estudante ---");
  const alunoTransferido = await estudanteDAO.atualizar(aluno2.codigo, {
    turmaCodigo: turmaEspanhol.codigo,
  });
  console.log(
    `${alunoTransferido.nome} agora está na turma código ${alunoTransferido.turmaCodigo}`,
  );

  console.log("\n--- Estudantes da turma de Espanhol ---");
  const estudantesEspanhol = await estudanteDAO.listarPorTurma(
    turmaEspanhol.codigo,
  );
  estudantesEspanhol.forEach((e) => console.log(e.nome));

  console.log("\n--- Removendo estudante ---");
  await estudanteDAO.remover(aluno3.codigo);
  console.log("Estudante removido.");

  console.log("\n--- Removendo turma (cascade) ---");
  await turmaDAO.remover(turmaIngles.codigo);
  console.log("Turma removida.");

  console.log("\n--- Listagem final de turmas ---");
  const turmasFinal = await turmaDAO.listarTodas();
  turmasFinal.forEach((t) => {
    console.log(`${t.nome} (${t.estudantes.length} alunos)`);
  });
}

main()
  .catch((e) => console.error("Erro na execução:", e))
  .finally(() => prisma.$disconnect());
