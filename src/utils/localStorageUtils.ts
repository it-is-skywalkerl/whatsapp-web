import { AllUserMessages, User } from "@/constant/types/common-types";

export function saveMessagesToLocalStorage(userMessages: AllUserMessages) {
  localStorage.setItem("messages", JSON.stringify(userMessages));
}

export function getMessagesFromLocalStorage(): AllUserMessages {
  const savedMessages = localStorage.getItem("messages");
  return savedMessages ? JSON.parse(savedMessages) : {};
}

export function saveUsersToLocalStorage(users: User[]) {
  localStorage.setItem("users", JSON.stringify(users));
}

export function getUsersFromLocalStorage(): User[] {
  const savedUsers = localStorage.getItem("users");
  return savedUsers ? JSON.parse(savedUsers) : [];
}
