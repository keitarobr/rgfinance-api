import { CategoryDTO } from "./category.dto";

export class MonetaryTransactionDTO {
    id: number;
    date: Date;
    value: number;
    category: CategoryDTO;
}