import { Title, Gender } from "../types";

export class Person {

    title: Title;
    name: string;
    gender: Gender;
    isPublic: boolean;

    constructor(title: Title, name: string, gender: Gender, isPublic: boolean) {
        this.title = title;
        this.name = name;
        this.gender = gender;
        this.isPublic = isPublic;
    }
}