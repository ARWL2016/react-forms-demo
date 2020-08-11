import { Person } from "../entities/Person";

const personStore = "react_forms_demo_person_store";

const seedData = [
  new Person("Mr", "John Richardson", "Male", true),
  new Person("Ms", "Samanthan Donahue", "Female", false),
];

export function init() {
  const data = window.localStorage.getItem(personStore);

  if (!data) {
    window.localStorage.setItem(personStore, JSON.stringify(seedData));
  }
}

export function getPersonList(): Person[] {
  const json = window.localStorage.getItem(personStore);
  console.log({ json });

  if (json) {
    return JSON.parse(json);
  } else {
    return seedData;
  }
}

export function savePerson(newPerson: Person) {
  const list = getPersonList();

  const index = list.findIndex((person) => person.id === newPerson.id);

  if (index > -1) {
    list[index] = newPerson;
  } else {
    list.push(newPerson);
  }

  window.localStorage.setItem(personStore, JSON.stringify(list));
}

export function deletePerson(id: string) {
  const list = getPersonList();

  const newList = list.filter((person) => person.id !== id);

  window.localStorage.setItem(personStore, JSON.stringify(newList));
}
