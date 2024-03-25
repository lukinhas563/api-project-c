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
                secondaryEconomicActivity: [],
            });
        }

        if (item.economic_id) {
            companyMap.get(companyId).secondaryEconomicActivity.push({
                id: item.economic_id,
                code: item.code,
                activity: item.activity,
                created_at: item.economic_created_at,
                updated_at: item.economic_updated_at,
            });
        }
    });

    return Array.from(companyMap.values());
};
