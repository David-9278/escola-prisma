import { prisma } from '../config/database.js';

export class TurmaDAO {
  async listarTodas() {
    return prisma.turma.findMany({
      include: { estudantes: true }
    });
  }

  async buscarPorCodigo(codigo: number) {
    return prisma.turma.findUnique({
      where: { codigo },
      include: { estudantes: true }
    });
  }

  async criar(dados: { nome: string; horario: string; idioma: string }) {
    return prisma.turma.create({ data: dados });
  }

  async atualizar(codigo: number, dados: { nome?: string; horario?: string; idioma?: string }) {
    return prisma.turma.update({
      where: { codigo },
      data: dados
    });
  }

  async remover(codigo: number) {
    await prisma.turma.delete({ where: { codigo } });
    return true;
  }
}
