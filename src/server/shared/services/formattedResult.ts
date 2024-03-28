export const formattedResult = (result: any[]) => {
    const companyMap = new Map();

    result.forEach((item) => {
        const companyId = item.id;

        if (!companyMap.has(companyId)) {
            companyMap.set(companyId, {
                id: item.id,
                company_name: item.company_name,
                fantasy_name: item.fantasy_name,
                cnpj: item.cnpj,
                email: item.email,
                size: item.size,
                tax_regime: item.tax_regime,
                status: item.status,
                opening_date: item.opening_date,
                main_economic_activity: item.main_economic_activity,
                id_collaborator: item.id_collaborator,
                id_user: item.id_user,
                created_at: item.created_at,
                updated_at: item.updated_at,
                secondaryEconomicActivity: new Map(),
                partners: new Map(),
                employees: new Map(),
                address: [],
            });
        }

        if (item.economic_id) {
            if (!companyMap.get(companyId).secondaryEconomicActivity.has(item.economic_id)) {
                companyMap.get(companyId).secondaryEconomicActivity.set(item.economic_id, {
                    id: item.economic_id,
                    code: item.code,
                    activity: item.activity,
                    created_at: item.economic_created_at,
                    updated_at: item.economic_updated_at,
                });
            }
        }

        if (item.partner_id) {
            if (!companyMap.get(companyId).partners.has(item.partner_id)) {
                companyMap.get(companyId).partners.set(item.partner_id, {
                    id: item.partner_id,
                    first_name: item.first_name,
                    last_name: item.last_name,
                    cpf: item.cpf,
                    email: item.email,
                    created_at: item.partner_created_at,
                    updated_at: item.partner_updated_at,
                });
            }
        }

        if (item.employe_id) {
            if (!companyMap.get(companyId).employees.has(item.employe_id)) {
                companyMap.get(companyId).employees.set(item.employe_id, {
                    id: item.employe_id,
                    first_name: item.employee_first_name,
                    last_name: item.employee_last_name,
                    cpf: item.employee_cpf,
                    email: item.employee_email,
                    role: item.employee_role,
                    workload: item.employee_workload,
                    created_at: item.employee_created_at,
                    updated_at: item.employee_updated_at,
                });
            }
        }

        if (item.address_id) {
            companyMap.get(companyId).address.push({
                id: item.address_id,
                street: item.street,
                number: item.number,
                complement: item.complement,
                city: item.city,
                state: item.state,
                zip_code: item.zip_code,
                created_at: item.address_created_at,
                updated_at: item.address_updated_at,
            });
        }
    });

    // Convert Map of company to Array before return
    const formattedCompanies = Array.from(companyMap.values());

    // Convert Map of activities to Array for each company
    formattedCompanies.forEach((company) => {
        company.secondaryEconomicActivity = Array.from(company.secondaryEconomicActivity.values());
    });

    // Convert Map of partners to Array for each company
    formattedCompanies.forEach((company) => {
        company.partners = Array.from(company.partners.values());
    });

    // Convert Map of employees to Array for each company
    formattedCompanies.forEach((company) => {
        company.employees = Array.from(company.employees.values());
    });

    return Array.from(companyMap.values());
};
