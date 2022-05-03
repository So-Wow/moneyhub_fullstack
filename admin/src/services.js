const axios = require("axios").default;
const config = require("config");
const R = require("ramda");

const getInvestments = async () => {
    const data = await axios.get(`${config.investmentsServiceUrl}/investments`).catch((error) => { console.log(error) });
    return (data.data);
}

const mapInvestments = (data) => {
    const investmentsOutput = R.project(['userId', 'firstName', 'lastName', 'date', 'holdings', 'value'], data);
    return investmentsOutput;
}

const getCompanies = () => {
    const companiesData = await axios.get(`${config.companiesServiceUrl}/companies`).catch((error) => { console.log(error) });
    return R.project(['id', 'name'], companiesData.data);
}

const calculateHoldingValue = (total, percentage) => {
    return total * percentage;
}

const matchCompany = (companiesData, id) => {
    const company = R.find(R.propEq('id', id))(companiesData);
    if (!company) {
        return "not found"
    } else {
        return company.name;
    }
}


module.exports = {
    getInvestments,
    getCompanies,
    mapInvestments,
    matchCompany,
    calculateHoldingValue
};