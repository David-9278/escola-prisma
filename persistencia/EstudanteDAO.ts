import { prisma } from '../config/database.js';

export class EstudanteDAO {
  async listarTodos() {
    return prisma.estudante.findMany({
      include: { turma: true }   // traz a turma a que pertence
    });
  }

  async buscarPorCodigo(codigo: number) {
    return prisma.estudante.findUnique({
      where: { codigo },
      include: { turma: true }
    });
  }

  async criar(dados: { nome: string; turmaCodigo: number }) {
    return prisma.estudante.create({ data: dados });
  }

  async atualizar(codigo: number, dados: { nome?: string; turmaCodigo?: number }) {
    return prisma.estudante.update({
      where: { codigo },
      data: dados
    });
  }

  async remover(codigo: number) {
    await prisma.estudante.delete({ where: { codigo } });
    return true;
  }

  async listarPorTurma(turmaCodigo: number) {
    return prisma.estudante.findMany({
      where: { turmaCodigo },
      include: { turma: true }
    });
  }
}
