// 705.484.450-52 070.987.720-03
/*
7x  0x 5x  4x  8x  4x  4x  5x  0x
10  9  8   7   6   5   4   3   2
70  0  40  28  48  20  16  15  0 = 237

11 - (237 % 11) = 5(Primeiro digito)

7x  0x  5x  4x  8x  4x  4x  5x  0x  5x
11  10  9   8   7   6   5   4   3   2
77  0   45  32  56  24  20  20  0   10 = 284

11- (284 % 11) = 2(Segundo digito)
Se o número digito for maior que 9, consideramos 0.
*/

class ValidaCPF {
  constructor(cpfEnviado) {
    Object.defineProperty(this, "cpfLimpo", {
      writable: false,
      enumerable: true,
      configurable: false,
      value: cpfEnviado.replace(/\D+/g, ""),
    });
  }

  isSequencia() {
    return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
  }

  geraNovoCpf() {
    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const digito1 = ValidaCPF.geraDigito(cpfParcial);
    const digito2 = ValidaCPF.geraDigito(cpfParcial + digito1);
    this.novoCpf = cpfParcial + digito1 + digito2;
  }

  static geraDigito(cpfParcial) {
    let total = 0;
    let reverso = cpfParcial.length + 1;

    for (let stringNumerica of cpfParcial) {
      total += reverso * Number(stringNumerica);
      reverso--;
    }

    const digito = 11 - (total % 11);
    return digito <= 9 ? String(digito) : "0";
  }

  valida() {
    if (!this.cpfLimpo) return false;
    if (this.cpfLimpo.length !== 11) return false;
    if (typeof this.cpfLimpo !== "string") return false;
    if (this.isSequencia()) return false;

    this.geraNovoCpf();

    return this.novoCpf === this.cpfLimpo;
  }
}

let validacpf = new ValidaCPF("070.987.720-03");

if (validacpf.valida()) {
  console.log("CPF válido");
} else {
  console.log("CPF inválido");
}
