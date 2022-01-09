export type UF = {
  id: number,
  sigla: string,
  nome: string
}

export type City = UF & {
  microrregiao: string
}