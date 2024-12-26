const fs = require("fs");
const path = require("path");

// Função para carregar os dados dos testes
function loadTestData() {
  // Caminho correto para o arquivo JSON que está acima da pasta `generateGraphs.js`
  const filePath = path.join(__dirname, '..', '..', 'test-results.json'); 
  const rawData = fs.readFileSync(filePath); // Lê o arquivo JSON
  const testData = JSON.parse(rawData);

  // Processar os dados
  const testSummary = {
    passed: testData.numPassedTests,
    failed: testData.numFailedTests,
    pending: testData.numPendingTests,
  };

  // Gerar os gráficos no console
  printSummary(testSummary);
  printRuntimeGraph(testData.testResults);
}

// Função para imprimir o resumo dos testes
function printSummary(testSummary) {
  console.log("\nResumo dos Testes:");
  console.table({
    "Testes Passados": testSummary.passed,
    "Testes Falhados": testSummary.failed,
    "Testes Pendentes": testSummary.pending,
  });
}

// Função para imprimir o gráfico de runtime
function printRuntimeGraph(testResults) {
  console.log("\nGráfico de Runtime por Teste:");
  testResults.forEach((result) => {
    const runtime = result.perfStats.runtime;
    const testName = result.testFilePath.split("\\").pop(); // Extrai o nome do arquivo de teste
    const bar = "█".repeat(runtime / 100); // Cria uma barra proporcional ao tempo de execução
    console.log(`${testName}: [${bar}] ${runtime}ms`);
  });
}

// Rodar a função de carregamento e exibição
loadTestData();
