Page({

  data: {
    buttonRows: [
      [
        { label: '←', handler: 'onBack', value: '' },
        { label: '±', handler: 'onSign', value: '' },
        { label: '^', handler: 'onOp', value: '^' },
        { label: '/', handler: 'onOp', value: '/' }
      ],
      [
        { label: '7', handler: 'onInput', value: '7' },
        { label: '8', handler: 'onInput', value: '8' },
        { label: '9', handler: 'onInput', value: '9' },
        { label: '*', handler: 'onOp', value: '*' }
      ],
      [
        { label: '4', handler: 'onInput', value: '4' },
        { label: '5', handler: 'onInput', value: '5' },
        { label: '6', handler: 'onInput', value: '6' },
        { label: '-', handler: 'onOp', value: '-' }
      ],
      [
        { label: '1', handler: 'onInput', value: '1' },
        { label: '2', handler: 'onInput', value: '2' },
        { label: '3', handler: 'onInput', value: '3' },
        { label: '+', handler: 'onOp', value: '+' }
      ],
      [
        { label: 'AC', handler: 'onClear', value: '' },
        { label: '0', handler: 'onInput', value: '0' },
        { label: '.', handler: 'onDot', value: '' },
        { label: '=', handler: 'onCalculate', value: '' }
      ]
    ],
    num1: "",
    num2: "",
    op: "",
    dot: false,
    output: 0,
    result: "",
  },

  // Ingreso de numeros //
  onInput(e) {
    const value = e.currentTarget.dataset.value;
    const { op, num1, num2 } = this.data;

    // Condicional para evitar desborde
    if (value === "0") {
      if (!op && (num1 === "" || num1 === "0")) {
        return;
      }
      if (op && (num2 === "" || num2 === "0")) {
        return;
      }
    }
    // Asignacion
    if (!op) {
      this.setData({ num1: num1 + value });
    } else {
      this.setData({ num2: num2 + value });
    }

    // Guardado de valores
    this.onOutput();
  },

  // Ingreso de operadores //
  onOp(e) {
    const { result, num1, num2 } = this.data;
    const newOp = e.currentTarget.dataset.value;

    if (num2) {
      this.onCalculate()
      this.setData({
        num1: this.data.output,
        op: newOp,
        num2: "",
      })
    } else {
      this.setData({
        op: newOp,
        num1: parseFloat(num1) || 0,
        num2: "",
        dot: false,
      })
    }

    if (result) {
      this.setData({ num1: result, result: "" })
    }

    // Guardado de valores
    this.onOutput();
  },

  // Funcion para invertir signo //
  onSign() {

    const { op, num1, num2 } = this.data;

    // Toma numero de variable para invertir el signo
    if (!op) {
      this.setData({
        num1: String(parseFloat(num1 || "0") * -1)
      });
    } else {
      this.setData({
        num2: String(parseFloat(num2 || "0") * -1)
      });
    }
    // Guardado de valores
    this.onOutput();
  },

  // Funcion para agregar el punto decimal // 
  onDot() {

    const { op, num1, num2, dot } = this.data;

    // Valida variable a adicionar punto
    if (!dot) {
      if (!op) {
        this.setData({ num1: num1.includes(".") ? num1 : num1 + "." });
      } else {
        this.setData({ num2: num2.includes(".") ? num2 : num2 + "." });
      }
      this.setData({ dot: true })
    }
    // Guardado de valores
    this.onOutput();
  },

  // Funcion para eliminar el ultimo caracter agregado //
  onBack() {
    const {
      op,
      num1,
      num2
    } = this.data;

    // Valida variable a ajustar
    if (!op) {
      this.setData({
        num1: num1.slice(0, -1) || "0"
      });
    } else {
      this.setData({
        num2: num2.slice(0, -1) || "0"
      });
    }

    // Guardado de valores
    this.onOutput();
  },

  // Funciom para hacer la operacion asignada //
  onCalculate() {
    const { op, num1, num2 } = this.data;
    const n1 = parseFloat(num1);

    // Para evitar el error de conversion
    const n2 = num2 === "" || isNaN(parseFloat(num2)) ? 0 : parseFloat(num2);

    // Variable temporal de resultado
    let result;
    // Selector de operaciones
    switch (op) {
      case '+':
        result = n1 + n2;
        break;

      case '-':
        result = n1 - n2;
        break;

      case '*':
        result = n1 * n2;
        break;

      case '/':
        result = n2 === 0 ? "0" : n1 / n2;
        break;

      case '^':
        result = n1 ** n2;
        break;

      default:
        result = this.data.output;
        break;
    }

    this.setData({
      result: String(result),
      op: "",
      num1: "",
      num2: "",
      dot: false,
      output: String(result),
    });
  },

  // Funcion de borrado de memoria //
  onClear() {
    this.setData({
      num1: "",
      num2: "",
      op: "",
      result: "",
      output: "0",
      dot: false,
    });
  },

  // Funcion para almacenar salida //
  onOutput() {
    const { num1, op, num2 } = this.data;
    this.setData({ output: num1 + op + num2 || "0"});
  },

  // Demas funciones nativas //
  onLoad(query) {
    // Page load
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // Page loading is complete
  },
  onShow() {
    // Page display
  },
  onHide() {
    // Page hidden
  },
  onUnload() {
    // Page is closed
  },
  onTitleClick() {
    // Title clicked
  },
  onPullDownRefresh() {
    // Page is pulled down
  },
  onReachBottom() {
    // Page is pulled to the bottom
  },
  onShareAppMessage() {
    // Back to custom sharing information
    return {
      title: 'Mi calculadora',
      desc: 'Calculadora basica, diseñada por Kharlz',
      path: 'pages/index/index',
    };
  },
});