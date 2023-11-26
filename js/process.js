let caseNumber = 1; // Initialize the case number

function extractTextFromPDF(pdfUrl) {
    return pdfjsLib.getDocument(pdfUrl).promise.then(function (pdf) {
        let text = "";
        const numPages = pdf.numPages;

        function extractPageText(pageNumber) {
            return pdf.getPage(pageNumber).then(function (page) {
                return page.getTextContent().then(function (textContent) {
                    const pageText = textContent.items.map((item) => item.str).join(" ");
                    text += pageText + "\n";
                });
            });
        }

        const pagePromises = [];
        for (let i = 1; i <= numPages; i++) {
            pagePromises.push(extractPageText(i));
        }

        return Promise.all(pagePromises).then(function () {
            return text;
        });
    });
}

function generateTable(pdfFiles) {
    const resultsContainer = document.getElementById("pdf-results");

    const pdfContainer = document.createElement("div");
    pdfContainer.className = "pdf-result";

    const caseNumberSpan = document.createElement("span");

    const table = document.createElement("table");
    table.innerHTML = `
        <tr>
            <th>File Name</th>
            <th>Type</th>
        </tr>
    `;

    const keywords = ["internship", "fulltime"];

    // Convert pdfFiles to an array using Array.from
    Array.from(pdfFiles).forEach(function (file) {
        const fileName = file.name;

        extractTextFromPDF(URL.createObjectURL(file)).then(function (extractedText) {
            let type = "Unknown";

            keywords.forEach(keyword => {
                if ((extractedText.match(new RegExp(keyword, "gi")) || []).length > 0) {
                    type = keyword;
                }
            });

            table.innerHTML += `
                <tr>
                    <td>${fileName}</td>
                    <td>${type}</td>
                </tr>
            `;
        });
    });

    pdfContainer.appendChild(caseNumberSpan);
    pdfContainer.appendChild(table);

    resultsContainer.appendChild(pdfContainer);

    caseNumber++;
}


document.getElementById("analyze-btn").addEventListener("click", function () {
    document.getElementById("pdf-results").innerHTML = "";
    caseNumber = 1;

    const fileInput = document.getElementById("file-input");
    const pdfFiles = fileInput.files;

    if (pdfFiles.length > 0) {
        generateTable(pdfFiles);
    } else {
        alert("Please select PDF files.");
    }
});
