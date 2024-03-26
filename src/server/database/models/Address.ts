export type typeAddress = {
    id: number;
    street: string;
    number: string;
    complement?: string;
    city: string;
    state: string;
    zip_code: string;

    id_user: number;
    id_company?: number;
    id_partner?: number;
    id_employee?: number;
};
