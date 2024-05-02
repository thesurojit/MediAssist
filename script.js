let medicineData = []; // Global variable to store medicine data from CSV

async function fetchMedicineData() {
    try {
        const response = await fetch('medicine_details.csv');
        const csvText = await response.text();
        medicineData = parseCSV(csvText);
    } catch (error) {
        console.error('Error fetching medicine data:', error);
        alert('Failed to fetch medicine data.');
    }
}

function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const entry = {};

        for (let j = 0; j < headers.length; j++) {
            entry[headers[j].trim()] = values[j].trim();
        }

        data.push(entry);
    }

    return data;
}

async function getMedicineDetails() {
    const medicineName = document.getElementById('medicineNameInput').value.trim();

    if (medicineName === '') {
        alert('Please enter a medicine name.');
        return;
    }

    if (medicineData.length === 0) {
        alert('Medicine data not loaded. Please try again later.');
        return;
    }

    const matchedMedicine = medicineData.find(medicine => medicine.drug_name.toLowerCase() === medicineName.toLowerCase());

    if (matchedMedicine) {
        displayMedicineDetails(matchedMedicine);
    } else {
        alert('Medicine details not found for the entered name.');
    }
}

function displayMedicineDetails(data) {
    const detailsContainer = document.getElementById('medicineDetails');
    detailsContainer.innerHTML = '';

    const drugName = data.drug_name || 'Not available';
    const medicalCondition = data.medical_condition || 'Not available';
    const sideEffects = data.side_effects || 'Not available';
    const genericName = data.generic_name || 'Not available';
    const drugClasses = data.drug_classes || 'Not available';
    const brandNames = data.brand_names || 'Not available';
    const activity = data.activity || 'Not available';
    const rxOtc = data.rx_otc || 'Not available';
    const pregnancyCategory = data.pregnancy_category || 'Not available';
    const csa = data.csa || 'Not available';
    const alcohol = data.alcohol || 'Not available';
    const relatedDrugs = data.related_drugs || 'Not available';
    const medicalConditionDescription = data.medical_condition_description || 'Not available';

    const html = `
        <h2>${drugName}</h2>
        <p><strong>Medical Condition:</strong> ${medicalCondition}</p>
        <p><strong>Side Effects:</strong> ${sideEffects}</p>
        <p><strong>Generic Name:</strong> ${genericName}</p>
        <p><strong>Drug Classes:</strong> ${drugClasses}</p>
        <p><strong>Brand Names:</strong> ${brandNames}</p>
        <p><strong>Activity:</strong> ${activity}</p>
        <p><strong>RX/OTC:</strong> ${rxOtc}</p>
        <p><strong>Related Drugs:</strong> ${relatedDrugs}</p>
        <p><strong>Medical Condition Description:</strong> ${medicalConditionDescription}</p>
    `;

    detailsContainer.innerHTML = html;
}

// Load medicine data when the page loads
window.addEventListener('DOMContentLoaded', fetchMedicineData);
