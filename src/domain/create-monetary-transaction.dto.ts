import { CategoryDTO } from "./category.dto";

export class CreateMonetaryTransactionDTO {
    date: Date;
    value: number;
    category: CategoryDTO;
}
