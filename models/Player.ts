export class Player {
  name: string;
  results: Array<number> = [];
  total: number = 0;

  constructor(name: string) {
    this.name = name;
  }

  addResult(result: number) {
    this.results.push(result);
    this.total += result;
  }
}