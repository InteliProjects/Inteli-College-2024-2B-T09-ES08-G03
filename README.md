# Inteli - Instituto de Tecnologia e Liderança 

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="https://www.inteli.edu.br/wp-content/uploads/2024/05/logo.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0" width=40% height=40%></a>
</p>

<br>

# Projeto Plantar

## Grupo Ipê

## 👨‍🎓 Integrantes: 
- <a href="https://www.linkedin.com/in/bruna-brasil-alexandre/">Bruna Brasil</a>
- <a href="https://www.linkedin.com/in/jo%C3%A3o-pedro-sotto-maior/">João Pedro Sotto</a>
- <a href="https://www.linkedin.com/in/kaleb-carvalho/">Kaleb Carvalho</a>
- <a href="https://www.linkedin.com/in/leandro-dos-santos-gomes/">Leandro dos Santos</a>
- <a href="https://www.linkedin.com/in/marcelo-miguel-pereira-de-assis-703710264/">Marcelo Assis</a>
- <a href="https://www.linkedin.com/in/renanfeit/">Renan Feitosa</a>

(...)

## 👩‍🏫 Professores:
### Orientador(a) 
- Hermano Peixoto

### Instrutores
- Reginaldo Arakaki
- Victor Hayashi
- Hermano Peixoto
- Francisco Escobar
- Geraldo Magela
- Lisane Valdo
- Ana Cristina dos Santos

## 📜 Descrição

### Estrutura da Arquitetura

A arquitetura do projeto é composta pelos seguintes serviços:

1. **API Gateway**: Controla o fluxo de dados entre o cliente e os demais serviços.
2. **API de Upload**: Gerencia o upload de arquivos e a comunicação com o serviço de controle de tempo.
3. **API de Logs**: Registra eventos importantes, garantindo rastreabilidade e não repúdio.
4. **API de Tempo de Resposta**: Monitora e controla o tempo de resposta, enviando alertas em caso de violações.

---

#### 1. API Gateway

##### Descrição
&emsp;&emsp;A API Gateway atua como um intermediário entre o cliente e os demais serviços da arquitetura. Ela é responsável por receber as requisições de upload e distribuí-las para os serviços de upload, logs e tempo de resposta.

##### Endpoints
- `POST /gateway/email`: Configura e-mails para alertas.
- `POST /gateway/upload`: Realiza o upload de arquivos.
- `GET /gateway/logs`: Recupera os logs dos uploads realizados.

#### 2. API de Upload

##### Descrição
&emsp;&emsp;A API de Upload gerencia o processo de envio de arquivos e comunica-se com a API de Tempo de Resposta para garantir o monitoramento do tempo de conclusão.

##### Endpoints
- `POST /file/upload`: Inicia o processo de upload, enviando o identificador e o tamanho do arquivo.

#### 3. API de Logs

##### Descrição
&emsp;&emsp;A API de Logs registra todos os eventos relacionados ao upload de arquivos, incluindo tempos de início, duração e identificadores únicos. Esses logs são essenciais para garantir rastreabilidade e não repúdio.

##### Endpoints
- `POST /log/add`: Adiciona um novo log.
- `GET /log`: Lista todos os logs registrados.

#### 4. API de Tempo de Resposta

##### Descrição
&emsp;&emsp;A API de Tempo de Resposta monitora o tempo de execução de cada upload, enviando alertas aos e-mails configurados caso o tempo exceda o limite definido.

##### Endpoints
- `POST /timer/start`: Inicia o monitoramento de tempo para um upload.
- `POST /timer/end`: Finaliza o monitoramento e registra o tempo decorrido.

#### Tecnologias Utilizadas
- Node.js: Ambiente de execução para JavaScript.
- NestJS: Framework utilizado para desenvolvimento das APIs.
- Fetch API: Para realizar requisições HTTP entre serviços.

## 📁 Estrutura de pastas

|--> assets<br>
  &emsp;| --> imagens <br>
  &emsp;| --> videos <br>
  &emsp;|--> readme.md<br>
|--> docs<br>
  &emsp;| --> apresentações <br>
  &emsp;|--> readme.md<br>
|--> src<br>
  &emsp;|--> notebooks<br>
  &emsp;|--> backend<br>
  &emsp;|--> frontend<br>
  &emsp;|--> readme.md<br>
| readme.md<br>

Dentre os arquivos e pastas presentes na raiz do projeto, definem-se:

- <b>assets</b>: aqui estão os arquivos relacionados a parte gráfica do projeto, ou seja, as imagens e links de vídeos que os representam (o logo do grupo pode ser adicionado nesta pasta).

- <b>docs</b>: aqui estão todos os documentos do projeto. Há também um arquivo README para o grupo registrar a localização de cada artefato.

- <b>src</b>: Todo o código fonte criado para o desenvolvimento do projeto, incluindo backend e frontend se aplicáveis.

- <b>README.md</b>: arquivo que serve como guia e explicação geral sobre o projeto (o mesmo que você está lendo agora).

## 🔧 Instalação

### Configuração Inicial:
1. Certifique-se de ter o **Node.js 20x** instalado.
2. Clone o repositório do projeto.

### API Gateway
1. Navegue até o diretório da API Gateway `src/api/gateway`.
2. Instale as dependências:
  ```bash
  npm i
  ```
3. Execute o serviço na porta 3000:
  ```bash
  npm start
  ``` 

### API de Logs
1. Navegue até o diretório da API de Logs `src/api/log`.
2. Instale as dependências:
  ```bash
  npm i
  ```
3. Execute o serviço na porta 3001:
  ```bash
  npm start
  ```

### API de Upload
1. Navegue até o diretório da API de Upload `src/api/upload-arquivo`.
2. Instale as dependências:
  ```bash
  npm i
  ```
3. Execute o serviço na porta 3002:
  ```bash
  npm start
  ```

### API de Tempo de Resposta
1. Navegue até o diretório da API de Tempo de Resposta `src/api/tempo-resposta`.
2. Instale as dependências:
  ```bash
  npm i
  ```
3. Execute o serviço na porta 3003:
  ```bash
  npm start
  ```

## 🗃 Histórico de lançamentos

* 0.4.0 - 09/12/2024  
  - Inclusão do modelo de medição e coleta de dados estáticos.  
  - Documentação de medições e resultados no novo sistema.  
  - Ajustes no mapa de medições e inclusão de trade-offs.  
  - Atualizações de testes automatizados e resultados.  

* 0.3.0 - 25/11/2024  
  - Estruturação de pastas e componentes da arquitetura.  
  - Implementação de cenários extremos e limites.  
  - Adição de testes automatizados e especificações TDD.  
  - Proposta e documentação da arquitetura.  

* 0.2.0 - 11/11/2024  
  - Simulação de sistemas atual e novo, com novos componentes de monitoramento.  
  - Solução técnica documentada e matriz de transição atualizada.  
  - Adição de avaliação de resultados e mecanismos usados no sistema atual.  

* 0.1.0 - 28/10/2024  
  - Definição de requisitos funcionais e não funcionais.  
  - Documentação inicial de simulações e cenários de crescimento.  
  - Estruturação e conexão estática do modelo.  

* 0.0.0 - 16/10/2024  
  - Template inicial.

## 📋 Licença/License

Plantar by <a href="https://www.linkedin.com/in/bruna-brasil-alexandre/">Bruna Brasil</a>, <a href="https://www.linkedin.com/in/jo%C3%A3o-pedro-sotto-maior/">João Pedro Sotto</a>, <a href="https://www.linkedin.com/in/kaleb-carvalho/">Kaleb Carvalho</a>, <a href="https://www.linkedin.com/in/leandro-dos-santos-gomes/">Leandro dos Santos</a>, <a href="https://www.linkedin.com/in/marcelo-miguel-pereira-de-assis-703710264/">Marcelo Assis</a>, <a href="https://www.linkedin.com/in/renanfeit/">Renan Feitosa</a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"></a></p>
