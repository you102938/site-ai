const form = document.querySelector("main form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");
const consentInput = document.getElementById("consent");
const confirmation = document.getElementById("confirmation");

function showFieldError(field, errorElement, message, invalidFields) {
  errorElement.textContent = message;

  if (message) {
    field.setAttribute("aria-invalid", "true");
    invalidFields.push(field);
  } else {
    field.removeAttribute("aria-invalid");
  }
}

function addConfirmationRow(list, label, value) {
  const term = document.createElement("dt");
  const description = document.createElement("dd");
  term.textContent = label;
  description.textContent = value;
  list.append(term, description);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const invalidFields = [];
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value;
  const trimmedMessage = message.trim();
  const allowedSubjects = ["reservation", "question", "other"];
  const subjectIsValid = allowedSubjects.includes(subjectInput.value);

  showFieldError(
    nameInput,
    document.getElementById("name-error"),
    name ? "" : "お名前を入力してください。",
    invalidFields
  );
  showFieldError(
    emailInput,
    document.getElementById("email-error"),
    !email
      ? "メールアドレスを入力してください。"
      : emailInput.validity.typeMismatch
        ? "メールアドレスに「@」を含む正しい形式で入力してください。"
        : "",
    invalidFields
  );
  showFieldError(
    subjectInput,
    document.getElementById("subject-error"),
    subjectIsValid ? "" : "ご用件を選択してください。",
    invalidFields
  );
  showFieldError(
    messageInput,
    document.getElementById("message-error"),
    !trimmedMessage
      ? "お問い合わせの内容を入力してください。"
      : message.length < 10
        ? "お問い合わせの内容は10文字以上で入力してください。"
        : message.length > 500
          ? "お問い合わせの内容は500文字以内で入力してください。"
          : "",
    invalidFields
  );
  showFieldError(
    consentInput,
    document.getElementById("consent-error"),
    consentInput.checked ? "" : "送信前に個人情報の取り扱いへの同意が必要です。",
    invalidFields
  );

  confirmation.hidden = true;
  while (confirmation.firstChild) {
    confirmation.removeChild(confirmation.firstChild);
  }

  if (invalidFields.length > 0) {
    invalidFields[0].focus();
    return;
  }

  const heading = document.createElement("h2");
  const details = document.createElement("dl");
  heading.textContent = "入力内容の確認";
  addConfirmationRow(details, "お名前", nameInput.value);
  addConfirmationRow(details, "メールアドレス", emailInput.value);
  addConfirmationRow(details, "ご用件", subjectInput.options[subjectInput.selectedIndex].textContent);
  addConfirmationRow(details, "お問い合わせの内容", messageInput.value);
  addConfirmationRow(details, "同意", "同意する");
  confirmation.append(heading, details);
  confirmation.hidden = false;
});
