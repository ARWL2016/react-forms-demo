import { Title, Gender } from "../types";
import { v4 as uuidv4 } from 'uuid';

export class Person {

    id: string;
    title: Title;
    name: string;
    gender: Gender;
    isPublic: boolean;


    constructor(title: Title, name: string, gender: Gender, isPublic: boolean, id?: string) {
        this.title = title;
        this.name = name;
        this.gender = gender;
        this.isPublic = isPublic;
        this.id = id || uuidv4();
    }
}