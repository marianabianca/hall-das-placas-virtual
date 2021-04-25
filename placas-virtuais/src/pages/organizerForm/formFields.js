import { csvJSON } from "./utils";

const validateGroupName = (name) => {
  let error;
  if (!name) {
    error = "Nome da turma é obrigatório.";
  } else if (name.length > 50) {
    error = "O nome deve ter menos que 50 caracteres, abrevie.";
  } else if (name.length < 3) {
    error = "O nome deve ter mais que 3 caracteres.";
  }
  return error;
};

const validateGraduationTime = (time) => {
  let error;
  if (!time) {
    error = "Período de graduação é obrigatório.";
  } else if (!RegExp("(19|20)[0-9][0-9]\\.[0-3]").test(time)) {
    error =
      "Formato de período de graduação incorreto. Formato correto: AAAA.P (ex.: 2019.1).";
  }
  return error;
};

const validateGroupPhoto = (url) => {
  let error;
  if (!url) {
    error = "Imagem de turma é obrigatória.";
    // eslint-disable-next-line no-useless-escape
  } else if (!RegExp("https?://.*.(?:png|jpg)").test(url)) {
    error = "A URL não corresponde a uma imagem no formato PNG ou JPG.";
  }
  return error;
};

const validateCSV = (value) => {
  let error;
  if (!value) {
    error = "CSV com dados dos graduandos é obrigatório.";
  }
  try {
    csvJSON(value);
  } catch (e) {
    error = "O texto não está no formato correto";
  }
  return error;
};

export const organizerFields = [
  {
    inputType: "input",
    name: "name",
    isRequired: true,
    label: "Nome da turma",
    placeholder: "Digite o nome da turma",
    validateFunc: validateGroupName,
  },
  {
    inputType: "input",
    name: "graduationTime",
    isRequired: true,
    label: "Período de graduação",
    placeholder: "Digite no formato AAAA.P ex.: 2019.1",
    validateFunc: validateGraduationTime,
  },
  {
    inputType: "input",
    name: "groupPhoto",
    isRequired: true,
    label: "URL da foto da turma em grupo",
    placeholder: "A imagem precisa ser no formato PNG ou JPG.",
    validateFunc: validateGroupPhoto,
  },
  {
    inputType: "radio",
    name: "color",
    label: "Cor do plano de fundo",
    isRequired: true,
    options: [
      "orange.300",
      "yellow.400",
      "green.400",
      "teal.400",
      "blue.400",
      "cyan.500",
      "purple.400",
      "pink.600",
      "red.400",
    ],
  },
  {
    inputType: "textArea",
    name: "people",
    label: "CSV com dados dos graduandos",
    isRequired: true,
    placeholder: "Cole aqui o CSV com os dados dos graduandos",
    validateFunc: validateCSV,
  },
  {
    inputType: "array",
    name: "section",
    isRequired: false,
    labelTitle: "Título da sessão",
    labelText: "Texto da sessão",
    placeholderTitle: "Digite o título da sessão",
    placeholderText: {
      text: "Digite o texto da sessão",
      list: "Digite a lista de nomes separadas por ponto e vígula (;)",
    },
  },
];
