export type typeCompany = {
    id: number;
    company_name: string;
    fantasy_name: string;
    cnpj: string;
    email?: string;
    size: string;
    tax_regime: string;
    status?: string;
    opening_date: string;
    main_economic_activity: string;

    id_collaborator: number;
    id_user: number;
};
