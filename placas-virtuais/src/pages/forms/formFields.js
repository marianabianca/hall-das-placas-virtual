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

const validateIndividualPhoto = (url) => {
  let error;
  if (!url) {
    error = "Imagem indivudual é obrigatória.";
    // eslint-disable-next-line no-useless-escape
  } else if (!RegExp("https?://.*.(?:png|jpg)").test(url)) {
    error = "A URL não corresponde a uma imagem no formato PNG ou JPG.";
  }
  return error;
};

const validateEnterTime = (time) => {
  let error;
  if (!time) {
    error = "Período de ingresso é obrigatório.";
  } else if (!RegExp("(19|20)[0-9][0-9]\\.[0-3]").test(time)) {
    error =
      "Formato de período de ingresso incorreto. Formato correto: AAAA.P (ex.: 2019.1).";
  }
  return error;
};

const validateName = (name) => {
  let error;
  if (!name) {
    error = "Nome é obrigatório.";
  } else if (name.length > 50) {
    error = "O nome deve ter menos que 50 caracteres, abrevie.";
  } else if (name.length < 3) {
    error = "O nome deve ter mais que 3 caracteres.";
  }
  return error;
};

export const organizerFields = {
  name: {
    name: "name",
    isRequired: true,
    label: "Nome da turma",
    placeholder: "Digite o nome da turma",
    validateFunc: validateGroupName,
  },
  graduationTime: {
    name: "graduationTime",
    isRequired: true,
    label: "Período de graduação",
    placeholder: "Digite no formato AAAA.P ex.: 2019.1",
    validateFunc: validateGraduationTime,
  },
  groupPhoto: {
    name: "groupPhoto",
    isRequired: true,
    label: "URL da foto da turma em grupo",
    placeholder: "A imagem precisa ser no formato PNG ou JPG.",
    validateFunc: validateGroupPhoto,
  },
  sections: {
    name: "section",
    labelTitle: "Título da sessão",
    labelText: "Texto da sessão",
    placeholderTitle: "Digite o título da sessão",
    placeholderText: {
      text: "Digite o texto da sessão",
      list: "Digite a lista de nomes separadas por ponto e vígula (;)",
    },
  },
};

export const studentFields = [
  {
    name: "name",
    isRequired: true,
    label: "Nome",
    placeholder: "Digite o seu nome completo",
    validateFunc: validateName,
  },
  {
    name: "enterTime",
    isRequired: true,
    label: "Período de ingresso",
    placeholder: "Digite no formato AAAA.P ex.: 2019.1",
    validateFunc: validateEnterTime,
  },
  {
    name: "graduationTime",
    isRequired: true,
    label: "Período de graduação",
    placeholder: "Digite no formato AAAA.P ex.: 2019.1",
    validateFunc: validateGraduationTime,
  },
  {
    name: "individualPhoto",
    isRequired: true,
    label: "URL da foto individual",
    placeholder: "A imagem precisa ser quadrada, no formato PNG ou JPG.",
    validateFunc: validateIndividualPhoto,
  },
  {
    name: "linkedin",
    isRequired: false,
    label: "Perfil no LinkedIn",
    placeholder: "URL do seu perfil no LinkedIn",
    validateFunc: () => {},
  },
];
